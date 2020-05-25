import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MetricsService } from '../../service/metrics.service';
import { Measure } from 'src/app/models/measure';
import { MetricGroup } from 'src/app/models/metric-group';
import { Metric } from 'src/app/models/metric';
import { TripleStore } from 'src/app/models/triple-store';



@Component({
  selector: 'app-benchmarks',
  templateUrl: './benchmarks.component.html',
  styleUrls: ['./benchmarks.component.css']
})
export class BenchmarksComponent implements OnInit {

  service: MetricsService;
  measuresBenchmarksData: Map<string, Map<string, Map<string,Map<string,Measure>>>>;
  metrics: Array<MetricGroup> = new Array<MetricGroup>();
  aggregateBenchmarksValue: Map<string,number>;
  isReady = false;
  triplestores: Array<TripleStore>;

  constructor(private metricsService: MetricsService) { 
    this.service = metricsService;
    this.metrics = new Array<MetricGroup>();
    this.measuresBenchmarksData = new Map<string, Map<string, Map<string,Map<string,Measure>>>>();
    this.aggregateBenchmarksValue = new Map<string,number>();
  }

  ngOnInit() {
    this.aggregateBenchmarksValue = new Map<string,number>();
    this.waitForData(this.service);
  }

  ngAfterViewInit(){
    this.aggregateBenchmarksValue = new Map<string,number>();
    this.measuresBenchmarksData = this.service.getBenchmarksMemory();
    this.metrics = this.service.getBenchmarkArrayData();
    this.triplestores = this.service.getTripleStoreArrayData();
    console.log('getBenchmarkArrayData',this.metrics);
    this.isReady = this.service.dataIsReady;
  }

  waitForData(metricsService: MetricsService) {

    if (!this.service || this.service.dataIsReady == false) {
      setTimeout(this.waitForData, 300);
    }
  }

  getMeasureTables(metricGroupKey: string, metricKey: string) {
    let measuresList = new Map();
    //console.log('metricGroupKey',metricGroupKey);
    //console.log('aqui',this.measuresBenchmarksData.get(metricGroupKey).get(metricKey) );
    if (this.measuresBenchmarksData.get(metricGroupKey)
     && this.measuresBenchmarksData.get(metricGroupKey).get(metricKey)
    && this.measuresBenchmarksData.get(metricGroupKey).get(metricKey).get('tables')) {
      measuresList = this.measuresBenchmarksData.get(metricGroupKey).get(metricKey).get('tables');
    }
    return measuresList;
  }

  getMeasure(metricGroupKey: string, metricKey: string, tripleStore: TripleStore) {
    /*
    let measure = {
      "tripleStoreId": tripleStore.id,
      "tripleStoreName": tripleStore.name,
      "groupKey": metricGroupKey,
      "measureKey": metricKey,
      "comment": 'Sin medida',
      "link": '',
      "score": 0,
      "scoreAgregate": 0,
      "value": 0,
      "uncertainty": 1
    };*/
    let measure: Measure;
    //console.log('metricGroupKey',metricGroupKey);
    //console.log('aqui',this.measuresBenchmarksData.get(metricGroupKey).get(metricKey) );
    if (this.measuresBenchmarksData.get(metricGroupKey)
     && this.measuresBenchmarksData.get(metricGroupKey).get(metricKey)
     && this.measuresBenchmarksData.get(metricGroupKey).get(metricKey).get('measures')
     && this.measuresBenchmarksData.get(metricGroupKey).get(metricKey).get('measures').get(tripleStore.id)) {
      measure= this.measuresBenchmarksData.get(metricGroupKey).get(metricKey).get('measures').get(tripleStore.id);
      /*
      measure = {
        "tripleStoreId": m['tripleStoreId'],
        "tripleStoreName": m['tripleStoreName'],
        "groupKey": m['groupKey'],
        "measureKey": m['measureKey'],
        "comment": m['comment'],
        "link": m['link'],
        "score": m['score'],
        "scoreAgregate": m['scoreAgregate'],
        "value": m['value'],
        "uncertainty": m['uncertainty'],
        "uncertaintyAgregate": m['uncertaintyAgregate']
      }*/
    }
    return measure;
  }


}
