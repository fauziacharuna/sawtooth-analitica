const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const ipfsApi = require('ipfs-api')
const multer = require('multer')
const KmsDocumentController = require('../../interface_adapters/controllers/KmsDocumentController')

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

const createHTTPServer = async (db) => {
    const app = express();
    app.use(cors());
    const DocumentController = require('../../interface_adapters/controllers/DocumentController');
    const AppraisalController = require('../../interface_adapters/controllers/AppraisalController');
    const KmsController = require('../../interface_adapters/controllers/KmsDocumentController');
    DocumentController.init(db);
    AppraisalController.init(db);
    KmsController.init(db);
    const ipfs = ipfsApi({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https'
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.post('/add', DocumentController.createDokumen);
    app.get('/appraisal/list', AppraisalController.listAppraisal);
    // app.get('/home', )
    app.get('/home', function (req, res) {
        res.send('hello world')
      })
    app.post('/appraisal', AppraisalController.createAppraisal);
    app.post('/upload', upload.single('image'), (req, res) => {
        ipfs.files.add(req.file.buffer, function (err, file) {
            if (err) {
                console.log(err);
            }
            console.log(file);
            return file;
        })
    });
    app.get('/get/:legalitas', DocumentController.getDokumen);
    app.get('/get', DocumentController.listDokumen);
    app.get('/pembanding', DocumentController.getPembanding);

    // KMS DOCUMENT 
    app.post('/add/kms', KmsController.createKmsDocument);
    app.get('/kms', KmsController.listKmsDokumen);
    
    return app;
}

module.exports = createHTTPServer;