import {MetricInt} from './metricInt'

export class Metric implements MetricInt{
    public id: string;
    public name: string;
    public description: string;
    public range: Array<number>;
    public weight: number;
    public uncertainty: number;
    public relativeWeight: number;
    public relativeWeightParent: number;

    constructor(data: Object) {
        if (data!=null) {
            this.id = data['id'];
            this.name = data['name'];
            this.description = data['description'];
            this.range = data['range'];
            this.weight = data['weight'];
            this.uncertainty = data['uncertainty'];
        }
    }

    public toJSON() {
        return {
            "id": this.id,
            "name": this.name,
            "description": this.description,
            "range": this.range,
            "weight": this.weight,
            "uncertainty": this.uncertainty
        }
    }
}
