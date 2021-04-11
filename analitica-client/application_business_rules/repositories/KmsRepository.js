class AppraisalRepository {
    constructor(repo) {
        this.repository = repo;
    }

    store(kmsEntity) {
        return this.repository.store(kmsEntity);
    }

    get(documentId) {
        return this.repository.get(documentId);
    }
    getAll() {
        return this.repository.getAll();
    }

}

module.exports = AppraisalRepository;