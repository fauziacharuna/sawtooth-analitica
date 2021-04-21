const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction, InternalError } = require('sawtooth-sdk/processor/exceptions')
const cbor = require('cbor')
const AnaliticaState = require('./state');
var { TP_FAMILY, TP_NAMESPACE } = require("./constants");

class AnaliticaHandler extends TransactionHandler {
    constructor() {
        super(TP_FAMILY, ['1.0'], [TP_NAMESPACE])
    }

    apply(transactionProcessRequest, context) {
        let payload = cbor.decode(transactionProcessRequest.payload);
        let state = new AnaliticaState(context);

        if (payload.type === 'appraisal') {
            return state.getValue(payload.type, payload.data.legalitas)
        }
            else  if (payload.type === 'kmsDocument') {
            return state.getValue(payload.type, payload.data.industriProyek , payload.data)
        } else  if (payload.type === 'appraisal') {
            return state.setValue(payload.type, payload.data.legalitas, payload.data)
        } else  if (payload.type === 'kmsDocument') {
            return state.setValue(payload.type, payload.data.industriProyek , payload.data)
        } else {
            throw  new InvalidTransaction(
            `Action must be set, get, or take not ${payload.action}`
            )
        }
    }
}
module.exports = AnaliticaHandler