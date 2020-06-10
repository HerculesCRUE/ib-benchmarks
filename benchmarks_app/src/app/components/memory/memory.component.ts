import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MetricsService } from '../../service/metrics.service';
import { Measure } from 'src/app/models/measure';
import { MetricGroup } from 'src/app/models/metric-group';
import { Metric } from 'src/app/models/metric';



@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit,AfterViewInit {

  service: MetricsService;
  measuresMemoryData: Map<string, Map<string, Map<string,Measure>>>;
  metrics: Array<MetricGroup> = new Array<MetricGroup>();
  aggregateMemoryValue: Map<string,number>;
  isReady = false;

  constructor(private metricsService: MetricsService) {
    this.service = metricsService;
    this.metrics = new Array<MetricGroup>();
    this.measuresMemoryData = new Map<string, Map<string, Map<string,Measure>>>();
    this.aggregateMemoryValue = new Map<string,number>();
   }

  ngOnInit() {
    this.aggregateMemoryValue = new Map<string,number>();
    this.waitForData(this.service);
  }

  ngAfterViewInit(){
    this.aggregateMemoryValue = new Map<string,number>();
    this.measuresMemoryData = this.service.getMeasuresMemory();
    this.metrics = this.service.getMemoryArrayData();
    this.isReady = this.service.dataIsReady;
  }

  waitForData(metricsService: MetricsService) {

    if (!this.service || this.service.dataIsReady == false) {
      setTimeout(this.waitForData, 300);
    }
  }

  getMeasure(metricGroupKey: string, metricKey) {
    let measuresList = new Map();
    if (this.measuresMemoryData.get(metricGroupKey) && this.measuresMemoryData.get(metricGroupKey).get(metricKey)) {
      measuresList = this.measuresMemoryData.get(metricGroupKey).get(metricKey);
    }
    return measuresList;
  }

  /*
  getMeasure(key: string) {
    return this.metrics.get(key);
  }

  getInnerMeasure(gKey: string,mKey: string) {
    let metricAux: Metric;
    if (this.metrics.get(gKey)) {
      if (this.metrics.get(gKey).metrics.get(mKey)) {
        metricAux = this.metrics.get(gKey).metrics.get(mKey);
      }
    }
    return metricAux;
  }

  getMeasuresMemoryData(gKey: string, iKey: string) {
    if (this.measuresMemoryData.get(gKey)) {
      if (!iKey) {
        return this.measuresMemoryData.get(gKey);
      } else if (this.measuresMemoryData.get(gKey).get(iKey)) {
        return this.measuresMemoryData.get(gKey).get(iKey);
      }
    }
    return null;
  }

  getAggregateMemoryValue(tsKey: string, range, value: number) {
    let acc = this.aggregateMemoryValue.get(tsKey);
    let max = range[range.length-1];
    if (acc) {
      this.aggregateMemoryValue.set(tsKey,acc+(value/max));
    } else {
      this.aggregateMemoryValue.set(tsKey,(value/max));
    }
    return this.aggregateMemoryValue.get(tsKey);
  }
  */

}
