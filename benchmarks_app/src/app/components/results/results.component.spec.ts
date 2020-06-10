import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsComponent } from './results.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { MetricsService } from '../../service/metrics.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../../../environments/environment';
import { EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsComponent],
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        FormsModule,
        BrowserModule
      ], 
      providers: [MetricsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Memory Final Data is ready', () => {
    return component.service.getIsDataReady().then(()=>{
      const memoryFinalData = component.service.getMemoryFinalData();
      console.log('memoryFinalData',memoryFinalData)
      expect(memoryFinalData.length).toEqual(9);
    })
  });

  it('Benchmarks Final Data is ready', () => {
    return component.service.getIsDataReady().then(()=>{
      const benchmarksFinalData = component.service.getBenchmarksFinalData();
      console.log('benchmarksFinalData',benchmarksFinalData)
      expect(benchmarksFinalData.length).toEqual(9);
    })
  });

});
