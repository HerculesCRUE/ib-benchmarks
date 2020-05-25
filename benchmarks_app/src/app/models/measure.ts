export class Measure {
    public groupKey: string;
    public measureKey: string;
    public tripleStoreId: string;
    public tripleStoreName: string;
    public value: number;
    public comment: string;
    public tag: string;
    public link: string;
    public score: number;
    public scoreAgregate: number;
    public uncertainty: number;
    public uncertaintyAgregate: number;
    public applicableRatio: number = 0;
    public applicableRatioAgregate: number = 0;

    constructor(groupKey: string, measureKey: string, data: Object) {
        this.groupKey = groupKey;
        this.measureKey = measureKey;
        if (data!=null) {
            this.tripleStoreId = data['tripleStoreId'];
            this.tripleStoreName = data['tripleStoreName'];
            this.value = data['value'];
            this.comment = data['comment'];
            if (data['link']) {
                this.link = data['link'];
            }
            if (data['tag']) {
                this.tag = data['tag'];
            }
            if (data['score'] != undefined) {
                this.score = data['score'];
            }
            if (data['applicableRatio'] != undefined) {
                this.applicableRatio = data['applicableRatio'];
            }
            if (data['uncertainty']) {
                this.uncertainty = data['uncertainty'];
            }
        }
    }

    public toJSON() {
        const jsonObj = {
            "tripleStoreId": this.tripleStoreId,
            "tripleStoreName": this.tripleStoreName,
            "value": this.value,
            "comment": this.comment
        };
        if (this.link) {
            jsonObj['link'] = this.link;
        }
        if (this.link) {
            jsonObj['tag'] = this.tag;
        }
        return jsonObj;
    }
}