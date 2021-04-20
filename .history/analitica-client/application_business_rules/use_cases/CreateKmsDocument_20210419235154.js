const KmsDocument = require('../../enterprise_business_rules/entities/KmsDocument');

module.exports = (dataKmsDokumen, KmsDokumenRepo) => {
    const kmsDokumen = new  KmsDocument(
        null,
        dataKmsDokumen.industriProyek,
        dataKmsDokumen.projectManagement,
        dataKmsDokumen.engineering,
        dataKmsDokumen.procurement,
        dataKmsDokumen.vendor,
        dataKmsDokumen.materialControl,
        dataKmsDokumen.fabricationConstruction,
        dataKmsDokumen.commisioning
    );
    return KmsDokumenRepo.store(kmsDokumen);

};
