import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {

  opened = new Set()

  constructor() { }

  ngOnInit() {
  }

  onClickLink(id) {
    console.log(id);
    if (id != null) {
      if (this.opened.has(id.value)) {
        this.opened.delete(id.value);
      } else {
        this.opened.add(id.value);
      }
      console.log(this.opened);
    }
  }

  getIcon(id) {

    if (this.opened.has(id)) {
        return 'fa fa-folder-open';
      } else {
        return 'fa fa-folder';
      }

  }



}
