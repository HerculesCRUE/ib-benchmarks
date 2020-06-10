import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryComponent } from './memory.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { MetricsService } from '../../service/metrics.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../../../environments/environment';
import { EventEmitter } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
// import { AppRoutingModule } from '../../app-routing.module';
// import { MetricsComponent } from '../metrics/metrics.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap' 

describe('MemoryComponent', () => {
  let component: MemoryComponent;
  let fixture: ComponentFixture<MemoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryComponent],
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        RouterTestingModule,
        NgbModule
        // AppRoutingModule,
        // MetricsComponent
      ], 
      providers: [MetricsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Measures Memory data is ready', () => {
    return component.service.getIsDataReady().then(()=>{
      const measuresMemory = component.service.getMeasuresMemory();
      console.log('measuresMemory',measuresMemory)
      expect(measuresMemory.size).toEqual(12);
    })
  });

  it('Memory Array data is ready', () => {
    return component.service.getIsDataReady().then(()=>{
      const memoryArrayData = component.service.getMemoryArrayData();
      console.log('memoryArrayData',memoryArrayData)
      expect(memoryArrayData.length).toEqual(12);
    })
  });
});
