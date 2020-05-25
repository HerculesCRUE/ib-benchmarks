import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetricGroup} from '../models/metric-group';
import { TripleStore} from '../models/triple-store';
import { AngularFireStorage } from '@angular/fire/storage';
import { Measure } from '../models/measure';
import { Weight } from '../models/weight';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  METRICS_BACKET = 'metrics.json';
  TRIPLESTORE_BACKET = 'triple-store.json';
  MEASURES_BACKET = 'measures.json';
  WEIGHTS_BACKET = 'weights.json';

  data = null;
  memory = new Map<string,MetricGroup>();
  benchmarks = new Map<string,MetricGroup>();
  memoryArray = new Array();
  memoryFinalData = new Array();
  benchmarksArray = new Array();
  benchmarksFinalData = new Array();
  measuresMemory = new Map();
  measuresMemoryDict = new Array();

  benchmarksMemory = new Map();
  benchmarksMemoryDict = new Array();

  dataIsReady = false;
  storageFirebase:AngularFireStorage;

  tripleStores = new Map();
  tripleStoresArray = new Array();

  weights = new Map<string,Weight>();

  constructor(private http: HttpClient,private storage: AngularFireStorage) { 
    // Read data from backet
    console.log('inicializando servicio MetricsService...');
    this.storageFirebase = storage;
    this.dataIsReady = false;
    this.populateData(storage);
    //this.populateTripleStorage(storage);
    //this.populateMeasures(storage);
    // this.dataIsReady = true;
  }

  public populateData(storage) {
    this.populateWeights(storage);
  }

  public populateMetrics(storage: AngularFireStorage) {
    const fileRef = this.storageFirebase.ref(this.METRICS_BACKET);
    fileRef.getDownloadURL().subscribe(url=>{
      //console.log('url:',url);
      this.getJSON(url).subscribe(jsonData => {
        //console.log('datos:',jsonData);
        this.data = jsonData;
        if (jsonData['memoria']) {
          let jsonMemory = jsonData['memoria'];
          jsonMemory.forEach( x => {
            const mg = new MetricGroup(x);
            this.memory.set(mg.id,mg);
            this.memoryArray.push(mg);
          });
        } 
        if (jsonData['benchmars']) {
          let jsonBenchmarks = jsonData['benchmars'];
          jsonBenchmarks.forEach( x => {
            const mg = new MetricGroup(x);
            this.benchmarks.set(mg.id,mg);
            this.benchmarksArray.push(mg);
          });
        }
        this.calculatePercentWeights();
      });
      this.populateTripleStorage(storage);
    });
  }

  public populateTripleStorage(storage: AngularFireStorage) {
    const fileRef = this.storageFirebase.ref(this.TRIPLESTORE_BACKET);
    fileRef.getDownloadURL().subscribe(url=>{
      this.getJSON(url).subscribe(jsonData => {

        jsonData.forEach( x => {
          const ts = new TripleStore(x);
          this.tripleStores.set(ts.id,ts);
          this.tripleStoresArray.push(ts);
        });
        //console.log('populateTripleStorage',this.tripleStoresArray);
      });
      this.populateMeasures(storage);
    });
  }

  public populateMeasures(storage: AngularFireStorage) {
    const fileRef = this.storageFirebase.ref(this.MEASURES_BACKET);
    fileRef.getDownloadURL().subscribe(url=>{
      this.getJSON(url).subscribe(jsonData => {
        this.data = jsonData;
        if (jsonData['memory']) {
          let jsonMemory = jsonData['memory'];
          jsonMemory.forEach( gk => {
            const gKey = gk['groupKey'];
            let jsonMetrics = gk['metrics'];

            if (!this.measuresMemory[gKey]) {
              this.measuresMemory.set(gKey, new Map());
            }

            jsonMetrics.forEach( metric => {
              const mKey = metric['measureKey'];
              let jsonMeasures = metric['measures'];
              if (!this.measuresMemory.get(gKey)[mKey]) {
                this.measuresMemory.get(gKey).set(mKey, new Map());
              }
              jsonMeasures.forEach( measure => {
                const objMeasure = new Measure(gKey,mKey, measure);
                this.measuresMemory.get(gKey).get(mKey).set(objMeasure.tripleStoreId,objMeasure);
              });
            });
          });
        }
        
        if (jsonData['benchmarks']) {
          let jsonBenchmarks = jsonData['benchmarks'];
          jsonBenchmarks.forEach( gk => {
            const gKey = gk['groupKey'];
            let jsonMetrics = gk['metrics'];

            if (!this.benchmarksMemory[gKey]) {
              this.benchmarksMemory.set(gKey, new Map());
            }

            jsonMetrics.forEach( metric => {
              const mKey = metric['measureKey'];
              let jsonMeasures = metric['measures'];
              let jsonTables = metric['tables'];
              if (!this.benchmarksMemory.get(gKey)[mKey]) {
                this.benchmarksMemory.get(gKey).set(mKey, new Map());
              }
              this.benchmarksMemory.get(gKey).get(mKey).set('tables',jsonTables);
              this.benchmarksMemory.get(gKey).get(mKey).set('measures',new Map());
              jsonMeasures.forEach( measure => {
                const objMeasure = new Measure(gKey,mKey, measure);
                this.benchmarksMemory.get(gKey).get(mKey).get('measures').set(objMeasure.tripleStoreId,objMeasure);
              });
              
            });
          });
        } 

        this.calculateScoreAndAgregate();
      });
      this.dataIsReady = true;
    });
    
  }

  populateWeights(storage: AngularFireStorage) {
    const fileRef = this.storageFirebase.ref(this.WEIGHTS_BACKET);
    fileRef.getDownloadURL().subscribe(url=>{
      this.getJSON(url).subscribe(jsonData => {
        const mWeigtht = new Weight('memory',jsonData['memory']);
        this.weights.set(mWeigtht.id,mWeigtht);
        const bWeigtht = new Weight('benchmars',jsonData['benchmars']);
        this.weights.set(bWeigtht.id,bWeigtht);
        //console.log('service weights:',this.weights );
        this.populateMetrics(storage);
      });
    });
  }

  calculateScoreAndAgregate(){
    const aggregateMap = new Map<string,number>();

    for (let entryMetricGroup of Array.from(this.measuresMemory.entries())) { // MetricGroup
      let keyMetricGroup = entryMetricGroup[0];
      let valueMetricGroup = entryMetricGroup[1];
      let metricGroup = this.memory.get(keyMetricGroup);

      //console.log('keyMetricGroup',keyMetricGroup);
      for (let entryMetric of Array.from(valueMetricGroup.entries())) { // Metric
        let keyMetric = entryMetric[0];
        let valueMetric = entryMetric[1];
        let metric = this.memory.get(keyMetricGroup).metrics.get(keyMetric);
        let maxRange = metric.range[metric.range.length-1];

        this.memoryFinalData.splice(0,this.memoryFinalData.length);
        for (let entryMeasure of Array.from(valueMetric.entries())) { // Measures
          let keyMeasure = entryMeasure[0];
          let valueMeasure = entryMeasure[1];
          valueMeasure.score = metric.relativeWeightParent * (valueMeasure.value/maxRange);
          if (!aggregateMap.has(keyMeasure)) {
            aggregateMap.set(keyMeasure,valueMeasure.score);
          } else {
            const acc = aggregateMap.get(keyMeasure) + valueMeasure.score;
            aggregateMap.set(keyMeasure,acc);
          }
          valueMeasure.scoreAgregate = aggregateMap.get(keyMeasure);
          this.memoryFinalData.push({
            "tripleStoreId": valueMeasure.tripleStoreId,
            "tripleStoreName": valueMeasure.tripleStoreName,
            "comment": valueMeasure.comment,
            "scoreAgregate": valueMeasure.scoreAgregate
          });
        }
      }
    }
    //console.log('this.memoryFinalData',this.memoryFinalData);


    const aggregateBenchmarksMap = new Map<string,Map<string,number>>();
    for (let entryMetricGroup of Array.from(this.benchmarksMemory.entries())) { // MetricGroup
      let keyMetricGroup = entryMetricGroup[0];
      let valueMetricGroup = entryMetricGroup[1];
      let metricGroup = this.benchmarks.get(keyMetricGroup);

      //console.log('keyMetricGroup',keyMetricGroup);
      for (let entryMetric of Array.from(valueMetricGroup.entries())) { // Metric
        let keyMetric = entryMetric[0];
        let valueMetric = entryMetric[1];
        let metric = this.benchmarks.get(keyMetricGroup).metrics.get(keyMetric);
        // let maxRange = metric.range[metric.range.length-1];

        // Para todos los triple stores
        this.benchmarksFinalData.splice(0,this.benchmarksFinalData.length);
        for (let entryTripleStore of Array.from(this.tripleStores.entries())) { // Measures
          let keyTripleStore = entryTripleStore[0];
          let valueTripleStore = entryTripleStore[1];
          let valueMeasure = valueMetric.get('measures').get(keyTripleStore);
          if (valueMeasure) {
            //console.log('valueMeasure',valueMeasure);
          //valueMeasure.score = metric.relativeWeightParent * (valueMeasure.score);
            valueMeasure.score = valueMeasure.score * metric.relativeWeightParent;
            valueMeasure.uncertainty = 0;
            valueMeasure.applicableRatio = valueMeasure.applicableRatio + metric.relativeWeightParent;
          } else {
            valueMeasure = new Measure(keyMetricGroup,keyMetric,{
              "tripleStoreId": keyTripleStore,
              "tripleStoreName": valueTripleStore.name,
              "value": 0,
              "comment": "",
              "score": 0,
              "uncertainty": 1 * metric.relativeWeightParent,
              "applicableRatio": 0
            });
          }
          if (!aggregateBenchmarksMap.has(keyTripleStore)) {
            aggregateBenchmarksMap.set(keyTripleStore,new Map<string,number>());
            //console.log('agregando....',valueMeasure);
            aggregateBenchmarksMap.get(keyTripleStore).set("score",valueMeasure.score);
            //console.log('...agregado',aggregateBenchmarksMap.get(keyTripleStore).get("score"));
            aggregateBenchmarksMap.get(keyTripleStore).set("uncertainty",valueMeasure.uncertainty);
            aggregateBenchmarksMap.get(keyTripleStore).set("applicableRatio",valueMeasure.applicableRatio);
          } else {
            //console.log('aqio 1',aggregateBenchmarksMap.get(keyTripleStore).get("score"));
            //console.log('aqio 2',valueMeasure);
            //console.log('aqio 3',aggregateBenchmarksMap);
            const accScore = aggregateBenchmarksMap.get(keyTripleStore).get("score") + valueMeasure.score;
            const accUncertainty = aggregateBenchmarksMap.get(keyTripleStore).get("uncertainty") + valueMeasure.uncertainty;
            const accApplicableRatio = aggregateBenchmarksMap.get(keyTripleStore).get("applicableRatio") + valueMeasure.applicableRatio;
            aggregateBenchmarksMap.get(keyTripleStore).set("score",accScore);
            aggregateBenchmarksMap.get(keyTripleStore).set("uncertainty",accUncertainty);
            aggregateBenchmarksMap.get(keyTripleStore).set("applicableRatio",accApplicableRatio);
            //aggregateBenchmarksMap.set(keyTripleStore,accScore);
            //console.log('aggregateMap',aggregateMap);
          }
          valueMeasure.scoreAgregate = aggregateBenchmarksMap.get(keyTripleStore).get("score");
          //console.log('aggregateBenchmarksMap', aggregateBenchmarksMap);
          valueMeasure.uncertaintyAgregate = aggregateBenchmarksMap.get(keyTripleStore).get("uncertainty");
          valueMeasure.applicableRatioAgregate = aggregateBenchmarksMap.get(keyTripleStore).get("applicableRatio");
          valueMetric.get('measures').set(keyTripleStore,valueMeasure);

          this.benchmarksFinalData.push({
            "tripleStoreId": valueMeasure.tripleStoreId,
            "tripleStoreName": valueMeasure.tripleStoreName,
            "comment": valueMeasure.comment,
            "scoreAgregate": valueMeasure.scoreAgregate,
            "uncertaintyAgregate": valueMeasure.uncertaintyAgregate,
            "applicableRatioAgregate": valueMeasure.applicableRatioAgregate
          });
        }
        //console.log('this.benchmarksFinalData',this.benchmarksFinalData);
        /*
                for (let entryMeasure of Array.from(valueMetric.get('measures').entries())) { // Measures
          let keyMeasure = entryMeasure[0];
          let valueMeasure = entryMeasure[1];
          //valueMeasure.score = metric.relativeWeightParent * (valueMeasure.score);
          valueMeasure.score = valueMeasure.score * metric.relativeWeightParent;
          if (!aggregateMap.has(keyMeasure)) {
            aggregateMap.set(keyMeasure,valueMeasure.score);
          } else {
            const acc = aggregateMap.get(keyMeasure) + valueMeasure.score;
            aggregateMap.set(keyMeasure,acc);
            console.log('aggregateMap',aggregateMap);
          }
          valueMeasure.scoreAgregate = aggregateMap.get(keyMeasure);
        }
        */

      }
    }


    //console.log('calculateScoreAndAgregateMemory',this.measuresMemory);
    //console.log('calculateScoreAndAgregateBechmarks',this.benchmarksMemory);
    /*
    this.measuresMemory.forEach((mgKey: string,mgValue: Map<string, any>) =>{ // for all metric-group
      const metricGroupMap = mgValue; // Metric-group
      console.log('metricGroupMap',metricGroupMap);
      metricGroupMap.forEach((mKey: string,mValue: any) => { // for all metric
        const metricMap = mValue; // Metric
        console.log(metricMap);
      });
    });*/
  }

  public getJSON(url): Observable<any> {
    return this.http.get(url);
  }

  public getMemoryData() {
    return this.memory;
  }

  public getBenchmarkData(){
    return this.benchmarks;
  }

  public getMemoryArrayData() {
    return this.memoryArray;
  }

  public getBenchmarkArrayData(){
    return this.benchmarksArray;
  }

  public getTripleStoreData() {
    return this.tripleStores;
  }

  public getTripleStoreArrayData() {
    return this.tripleStoresArray;
  }

  public getMeasuresMemory() {
    return this.measuresMemory;
  }

  public getBenchmarksMemory() {
    return this.benchmarksMemory;
  }

  public getWeights() {
    return this.weights;
  }

  public getMemoryFinalData() {
    return this.memoryFinalData;
  }
  
  public getBenchmarksFinalData() {
    return this.benchmarksFinalData;
  }


  public calculatePercentWeights(){
    let totalMemoryWeight = 0;
    this.memoryArray.forEach(m=>{
      let totalMemoryWeightInner = 0;
      totalMemoryWeight += m.weight
      m.metrics.forEach(mi =>{
        totalMemoryWeightInner += mi.weight;
      });
      m.metrics.forEach(mi =>{
        mi.relativeWeight = mi.weight/totalMemoryWeightInner;
      });
    });
    this.memoryArray.forEach(m=>{
      m.relativeWeight=m.weight/totalMemoryWeight
      m.metrics.forEach(mi =>{
        mi.relativeWeightParent = mi.relativeWeight*m.relativeWeight;
      });
    });


    let totalBenchmarksWeight = 0;
    this.benchmarksArray.forEach((m: MetricGroup) => {
      let totalBenchmarksWeightInner = 0;
      totalBenchmarksWeight += m.weight;
      m.metrics.forEach(mi =>{
        totalBenchmarksWeightInner += mi.weight;
      });
      m.metrics.forEach(mi =>{
        mi.relativeWeight = mi.weight/totalBenchmarksWeightInner;
      });
    });

    this.benchmarksArray.forEach(m=>{
      m.relativeWeight=m.weight/totalBenchmarksWeight
      m.metrics.forEach(mi =>{
        mi.relativeWeightParent = mi.relativeWeight*m.relativeWeight;
      });
    });
  }

  public saveInFile(){

    const memoryJson = [];
    const bechmarksJson = [];
    this.memoryArray.forEach(m=>{
      memoryJson.push(m.toJSON());
    });
    this.benchmarksArray.forEach(m=>{
      bechmarksJson.push(m.toJSON());
    });
    const dataJson = {
      memoria: memoryJson,
      benchmars: bechmarksJson
    }
    const jsonContent = JSON.stringify(dataJson);

    const fileRef = this.storageFirebase.ref(this.METRICS_BACKET);
    fileRef.putString(jsonContent).then(function(snapshot) {
      console.log('Uploaded data!');
    })
    this.calculatePercentWeights();
  }

  public saveWeightsInFile(mw: number, bw:number){

    if (mw) {
      this.weights.get('memory').value = mw;
    }

    if (bw) {
      this.weights.get('benchmars').value = bw;
    }

    const dataJson = {
      memory: this.weights.get("memory").value,
      benchmars: this.weights.get("benchmars").value
    }
    const jsonContent = JSON.stringify(dataJson);

    const fileRef = this.storageFirebase.ref(this.WEIGHTS_BACKET);
    fileRef.putString(jsonContent).then(function(snapshot) {
      console.log('Uploaded weight data!');
    })
    this.calculatePercentWeights();
  }
  

}
