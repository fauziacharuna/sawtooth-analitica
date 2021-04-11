class KmsDocument {
    constructor(
        id = null,
        industriProyek, 
        projectManagement, 
        engineering, 
        procurement,
        vendor, 
        materialControl, 
        fabricationConstruction, 
        commisioning
    ){
        this.id = id;
        this.industriProyek = industriProyek,
        this.projectManagement = projectManagement,
        this.engineering = engineering, 
        this.procurement = procurement,
        this.vendor = vendor,
        this.materialControl = materialControl, 
        this.fabricationConstruction = fabricationConstruction, 
        this.commisioning = commisioning
    }
}
module.exports = KmsDocument;