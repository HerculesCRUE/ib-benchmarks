export class TripleStore {
    public id: string;
    public name: string;
    public description: string;
    public distributor: string;
    public webSite: string;
    public tecnicalDocumentation: string;
    public commentsOfInterest: string;
    public caseUse: string;
    public logo: string;

    constructor(data: Object) {
        if (data!=null) {
            this.id = data['id'];
            this.name = data['name'];
            this.description = data['description'];
            this.distributor = data['distributor'];
            this.webSite = data['webSite'];
            this.tecnicalDocumentation = data['tecnicalDocumentation'];
            if (data['commentsOfInterest'])
                this.commentsOfInterest = data['commentsOfInterest'];
            if (data['caseUse'])
                this.caseUse = data['caseUse'];
            if (data['logo'])
                this.logo = data['logo'];
        }
    }
}