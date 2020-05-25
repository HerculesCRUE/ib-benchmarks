import {Metric} from './metric'
import {MetricInt} from './metricInt'

export class MetricGroup implements MetricInt{
    id: string;
    name: string;
    description: string;
    metrics: Map<string,Metric>;
    weight: number;
    uncertainty: number;
    public relativeWeight: number;
    public percent: number;

    constructor(data: Object) {
        this.id = data['id'];
        this.name = data['name'];
        this.description = data['description'];
        this.weight = data['weight'];
        this.uncertainty = data['uncertainty'];
        this.metrics = new Map<string,Metric>();
        data['metricas'].forEach( x=> {
            const m = new Metric(x);
            this.metrics.set(m.id,m);
        });
    }

    public toJSON() {

        const jsonMetrics = [];

        this.metrics.forEach((value: Metric, key: string) => {
            jsonMetrics.push(value.toJSON());
        });

        return {
            "id": this.id,
            "name": this.name,
            "description": this.description,
            "weight": this.weight,
            "uncertainty": this.uncertainty,
            "metricas": jsonMetrics
        };
    }
}
