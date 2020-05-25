import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MetricsService } from '../../service/metrics.service';
import { Weight } from 'src/app/models/weight';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  service: MetricsService;
  memoryFinalData: Array<object>;
  benchmarksFinalData: Array<object>;
  finalData: Array<object>;
  weights: Map<string,Weight>;

  constructor(private metricsService: MetricsService) { 
    this.service = metricsService;
  }

  ngOnInit() {
    this.memoryFinalData = this.service.getMemoryFinalData();
    console.log('this.memoryFinalData',this.memoryFinalData);
    this.benchmarksFinalData = this.service.getBenchmarksFinalData();
    console.log('this.benchmarksFinalData',this.benchmarksFinalData);
    this.weights = this.service.getWeights();
  }

  isDataReady() {
    if (this.memoryFinalData != undefined && this.memoryFinalData.length > 0 &&
    this.benchmarksFinalData != undefined && this.benchmarksFinalData.length > 0 &&
    this.weights != undefined && this.weights.size > 0 ) {
      this.memoryFinalData = this.memoryFinalData.sort(function(a,b){
        return b['scoreAgregate'] - a['scoreAgregate'];
      });
      this.benchmarksFinalData = this.benchmarksFinalData.sort(function(a,b){
        return b['scoreAgregate'] - a['scoreAgregate'];
      });
      this.finalData = this.calculateFinalData();
      return true;
    } else {
      return false;
    }
  }

  calculateFinalData(){
    let finalDataArray = new Array();
    let finalDataMap = new Map();
    this.memoryFinalData.forEach(x =>{
      finalDataMap.set(x['tripleStoreId'], x);
    });
    this.benchmarksFinalData.forEach(x =>{ // x=benchmarks
      let memoryData = finalDataMap.get(x['tripleStoreId']); // memoryData = memory
      const finalData = {
        'tripleStoreId': x['tripleStoreId'],
        'tripleStoreName': x['tripleStoreName'],
        'scoreMemoryAgregate': memoryData['scoreAgregate'],
        'scoreBenchmarksAgregate': x['scoreAgregate'],
        'weighMemory': this.weights.get('memory').value,
        'weighBenchmark': this.weights.get('benchmars').value,
        'uncertaintyAgregate':x['uncertaintyAgregate']
      }
      finalData['finalWeighBenchmark'] = this.getBenchmarksRelativeWeight()*(1-finalData['uncertaintyAgregate'])
      finalData['finalWeighMemory'] = this.getMemoryRelativeWeight()+(this.getBenchmarksRelativeWeight()*finalData['uncertaintyAgregate']);
      //console.log('scoreMemoryAgregate: '+ finalData['scoreMemoryAgregate'] + '\t,finalWeighMemory:'+finalData['finalWeighMemory']);
      finalData['finalMemoryScore'] = finalData['scoreMemoryAgregate']*finalData['finalWeighMemory'];
      //console.log('finalMemoryScore: ',finalData['finalMemoryScore']);
      finalData['finalBenchmarkScore'] = ((finalData['uncertaintyAgregate']!=1)?(finalData['scoreBenchmarksAgregate']/(1-finalData['uncertaintyAgregate'])):0)*finalData['finalWeighBenchmark'];
      finalData['finalTotalScore'] = finalData['finalMemoryScore']+finalData['finalBenchmarkScore'];
      finalDataArray.push(finalData);
    });
    console.log('finalResult',finalDataArray);
    return finalDataArray.sort(function(a,b){
      return b['finalTotalScore'] - a['finalTotalScore'];
    });
  }

  getMemoryRelativeWeight() {
    return this.weights.get('memory').value/(this.weights.get('memory').value+this.weights.get('benchmars').value);
  }

  getBenchmarksRelativeWeight() {
    return this.weights.get('benchmars').value/(this.weights.get('memory').value+this.weights.get('benchmars').value);
  }

}
