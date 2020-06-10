import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarksComponent } from './benchmarks.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { MetricsService } from '../../service/metrics.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../../../environments/environment';
import { EventEmitter } from '@angular/core';

describe('BenchmarksComponent', () => {
  let component: BenchmarksComponent;
  let fixture: ComponentFixture<BenchmarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenchmarksComponent ],
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
      ], 
      providers: [MetricsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a BechmarksComponent', () => {
    const compiled = fixture.debugElement.nativeElement;
    console.log('component measuresBenchmarksData', component.measuresBenchmarksData);
    expect(component).toBeTruthy()
  });

  it('Benchmarks Array data is ready', () => {
    console.log('Ya no es 0');
    return component.service.getIsDataReady().then(()=>{
      const benchmarksArrayData = component.service.getBenchmarkArrayData();
      expect(benchmarksArrayData.length).toEqual(2);
    })
  });

  it('TripleStore Array data is ready', () => {
    console.log('Ya no es 0');
    return component.service.getIsDataReady().then(()=>{
      const tripleStoreArrayData = component.service.getTripleStoreArrayData();
      console.log('benchmarksArrayData',tripleStoreArrayData)
      expect(tripleStoreArrayData.length).toEqual(9);
    })
  });


});
