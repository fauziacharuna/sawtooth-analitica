class KmsRepository {
    constructor(repo) {
        this.repository = repo;
    }

    store(kmsEntity) {
        return this.repository.store(kmsEntity);
    }

    get(documentId) {
        return this.repository.get(documentId);
    }

    getKmsDocument() {
        return this.repository.getKmsDocument();
    }
}

module.exports = KmsRepository;