const KmsDocument = require('../../enterprise_business_rules/entities/KmsDocument');

module.exports = (kmsDokumen, KmsDokumenRepo) => {
    const kmsDokumen = new  KmsDocument(
        null,
        kmsDokumen.industriProyek,
        kmsDokumen.projectManagement,
        kmsDokumen.engineering,
        kmsDokumen.procurement,
        kmsDokumen.vendor,
        kmsDokumen.materialControl,
        kmsDokumen.fabricationConstruction,
        kmsDokumen.commisioning
    );
    return KmsDokumenRepo.store(kmsDokumen);

};
