const {createHash} = require('crypto')
const {CryptoFactory, createContext } = require('sawtooth-sdk/signing')
const protobuf = require('sawtooth-sdk/protobuf')
const cbor = require('cbor')
const fetch = require('node-fetch');
const {TextEncoder, TextDecoder} = require('text-encoding/lib/encoding')

const FAMILY_NAME = 'analitica'
const FAMILY_VERSION = '1.0'

const hash = (v) => createHash('sha512').update(v).digest('hex');

class AnaliticaClient {
    constructor() {
        const context = createContext('secp256k1');
        const privateKey = context.newRandomPrivateKey();

        this.signer = new CryptoFactory(context).newSigner(privateKey);
        this.publicKey = this.signer.getPublicKey().asHex();
        this.address = hash(FAMILY_NAME).substr(0, 6);
        console.log("Storing at: " + this.address);
    }

    store(payload) {
        return this._wrap_and_send("set", JSON.stringify(payload));
    }

    get(legalitas) {
        this._wrap_and_send("get", legalitas);
    }

    _wrap_and_send(action, values){
        let payload = {};
        payload.action = action;
        payload.data = JSON.parse(values);
        console.log('blockchain payload:', payload)
        const payloadBytes = cbor.encode(payload);

        const transactionHeaderBytes = protobuf.TransactionHeader.encode({
            familyName: FAMILY_NAME,
            familyVersion: FAMILY_VERSION,
            inputs: [this.address],
            outputs: [this.address],
            signerPublicKey: this.signer.getPublicKey().asHex(),
            nonce: "" + Math.random(),
            batcherPublicKey: this.signer.getPublicKey().asHex(),
            dependencies: [],
            payloadSha512: hash(payloadBytes),
        }).finish();

        const transaction = protobuf.Transaction.create({
            header: transactionHeaderBytes,
            headerSignature: this.signer.sign(transactionHeaderBytes),
            payload: payloadBytes
        });

        const transactions = [transaction];

        const batchHeaderBytes = protobuf.BatchHeader.encode({
            signerPublicKey: this.signer.getPublicKey().asHex(),
            transactionIds: transactions.map((txn) => txn.headerSignature),
        }).finish();

        const batchSignature = this.signer.sign(batchHeaderBytes);

        const batch = protobuf.Batch.create({
            header: batchHeaderBytes,
            headerSignature: batchSignature,
            transactions: transactions,
        });

        const batchListBytes = protobuf.BatchList.encode({
            batches: [batch]
        }).finish();

        return this._send_to_rest_api(batchListBytes);
    }

    _send_to_rest_api(batchListBytes){
        if (batchListBytes == null) {
            var geturl = 'http://localhost:8008/state/'+this.address
            console.log("Getting from: " + geturl);
            return fetch(geturl, {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                var data = responseJson.data;
                var amount = new Buffer(data, 'base64').toString();
                return amount;
            })
            .catch((error) => {
                console.error(error);
            });
        }
        else{
            return fetch('http://localhost:8008/batches', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/octet-stream'
                },
                body: batchListBytes
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }
}
module.exports = AnaliticaClient;
