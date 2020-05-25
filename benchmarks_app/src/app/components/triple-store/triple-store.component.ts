import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../../service/metrics.service';
import { TripleStore } from '../../models/triple-store'

@Component({
  selector: 'app-triple-store',
  templateUrl: './triple-store.component.html',
  styleUrls: ['./triple-store.component.css']
})
export class TripleStoreComponent implements OnInit {

  service: MetricsService;
  tripleStoreData: Map<string, TripleStore>;
  tripleStoreDataArray: Array<TripleStore>;

  constructor(private metricsService: MetricsService) { 
    this.service = metricsService;
  }

  ngOnInit() {
    this.waitForData(this.service);
    this.tripleStoreData = this.service.getTripleStoreData();
    this.tripleStoreDataArray = this.service.getTripleStoreArrayData();
    //alert(Math.ceil(this.tripleStoreData.size/2));
    console.log('tam',this.tripleStoreDataArray.length);
  }

  waitForData(metricsService: MetricsService) {

    if (!this.service || this.service.dataIsReady == false) {
      console.log('esperando');
      setTimeout(this.waitForData, 300);
    }
  }

}
