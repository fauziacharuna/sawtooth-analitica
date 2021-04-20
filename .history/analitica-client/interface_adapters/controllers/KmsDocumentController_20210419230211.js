const { check, param, query, validationResult } = require('express-validator');

// const CreateDocument = require('../../application_business_rules/use_cases/CreateDocument');
// const ListDocument = require('../../application_business_rules/use_cases/ListDocument');
// const GetDocument = require('../../application_business_rules/use_cases/GetDocument');
// const GetPembanding = require('../../application_business_rules/use_cases/GetPembanding');
const CreateKmsDocument = require('../../application_business_rules/use_cases/CreateKmsDocument');

const KmsDocumentRepository = require('../../application_business_rules/repositories/KmsRepository');

const AnaliticaClient = require('../storage/Blockchain');
const ListKmsDocument = require('../../application_business_rules/use_cases/ListKmsDocument');
const blockchain = new KmsDocumentRepository(new AnaliticaClient());
// const blockchain = new DocumentRepository(new AnaliticaClient());
let kmsDocumentRepo;


module.exports = {
    init: (db) => {
        kmsDocumentRepo = new KmsDocumentRepository(db);
        // dokumenRepo = new DocumentRepository(db);
    },
    createKmsDocument: [
        check('industriProyek').exists().not().isEmpty(),
        check('projectManagement').exists().not().isEmpty(),
        check('engineering').exists().not().isEmpty(),
        check('procurement').exists().not().isEmpty(),
        check('vendor').exists().not().isEmpty(),
        check('materialControl').exists().not().isEmpty(),
        check('fabricationConstruction').exists().not().isEmpty(),
        check('commisioning').exists().not().isEmpty(),
        async (req, res, next) => {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array())
            }
            const doc = await CreateKmsDocument(req.body, blockchain);
            return res.status(200).json(doc);
        }
        
    ],
    
    // listDokumen: async (req, res, next) => {
    //     const docs = await ListDocument(dokumenRepo);
    //     return res.status(200).json(docs);
    // }
    listKmsDokumen: async (req, res, next) => {
        const docs = await ListKmsDocument(kmsDocumentRepo);
        

        // const docs = await ListKmsDokumen(kmsDocumentRepo);
        return res.status(200).json(docs);
    }
}