import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MetricsService } from '../../service/metrics.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MetricInt } from '../../models/metricInt';
import { Metric } from '../../models/metric';
import { MetricGroup } from '../../models/metric-group';
import { Weight } from '../../models/weight';

@Component({
  selector: 'app-weights',
  templateUrl: './weights.component.html',
  styleUrls: ['./weights.component.css']
})
export class WeightsComponent implements OnInit, AfterViewInit {

  service: MetricsService;
  memoryData: Map<string,MetricGroup>;
  benchmarkData: Map<string,MetricGroup>;
  memoryArrayData: Array<MetricGroup>;
  benchmarkArrayData: Array<MetricGroup>;
  closeResult = '';
  inEditMetricEntity: MetricInt;
  nameInEdit:string;
  descriptionInEdit: string;
  weighthInEdit: number;
  inEditIndex;
  inEditKey;
  inEditType;
  // item,i,1,'memory'
  weights;
  memoryWeight: number;
  benchmarksWeight: number;


  
  constructor(private metricsService: MetricsService) { 
    this.service = metricsService;
  }

  ngOnInit() {
    this.waitForData(this.service);
    this.weights = this.service.getWeights();
    console.log('component weights',this.weights);
    this.memoryArrayData = this.service.getMemoryArrayData();
    this.benchmarkArrayData = this.service.getBenchmarkArrayData();

  }

  ngAfterViewInit(){
  }

  waitForData(metricsService: MetricsService) {
    if (!metricsService || metricsService.dataIsReady == false) {
      setTimeout(this.waitForData, 300);
    }
  }


  onClickSubmit(formData) {
    console.log('formData',formData);
  }

  getMemoryData(key: string) {
    return this.memoryData[key];
  }


  editItem(index, key, type) {
    console.log('key',key);
    console.log('index',index);
    if (type == 'memory') {
      this.inEditMetricEntity = this.memoryArrayData[index];
    } else {
      this.inEditMetricEntity = this.benchmarkArrayData[index];
    }
    if (key) {
      console.log('this.inEditMetricEntity ', this.inEditMetricEntity['metrics'].get(key));
      this.inEditMetricEntity =  this.inEditMetricEntity['metrics'].get(key);
    }
    this.inEditIndex = index;
    this.inEditKey = key;
    this.inEditType = type;
    this.nameInEdit = this.inEditMetricEntity.name;
    this.descriptionInEdit = this.inEditMetricEntity.description;
    this.weighthInEdit =this.inEditMetricEntity.weight;
  }

  toFixedTrunc(x, n) {
    const v = (typeof x === 'string' ? x : x.toString()).split('.');
    if (n <= 0) return v[0];
    let f = v[1] || '';
    if (f.length > n) return `${v[0]}.${f.substr(0,n)}`;
    while (f.length < n) f += '0';
    return `${v[0]}.${f}`
  }

  onChange() {
    this.inEditMetricEntity.weight= this.weighthInEdit;
    this.service.saveInFile();
  }
  
  saveWeights(event) {
    this.weights.get('memory').value = this.memoryWeight;
    this.weights.get('benchmars').value = this.benchmarksWeight;
    console.log('this.memoryWeight',this.memoryWeight);
    console.log('this.benchmarksWeight',this.benchmarksWeight);
    this.service.saveWeightsInFile(this.memoryWeight,this.benchmarksWeight);
  }

  isDataReady() {
    if (this.weights.size > 0) {
      this.memoryWeight = this.weights.get('memory').value;
      this.benchmarksWeight = this.weights.get('benchmars').value;
      return true;
    } else {
      return false;
    }
  }
  

}
