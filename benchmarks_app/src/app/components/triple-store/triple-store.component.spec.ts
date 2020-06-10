import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripleStoreComponent } from './triple-store.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MetricsService } from '../../service/metrics.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../../../environments/environment';
import { EventEmitter } from '@angular/core';

describe('TripleStoreComponent', () => {
  let component: TripleStoreComponent;
  let fixture: ComponentFixture<TripleStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripleStoreComponent ],
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
    fixture = TestBed.createComponent(TripleStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Triple Store Data is ready', () => {
    return component.service.getIsDataReady().then(()=>{
      const tripleStoreData = component.service.getTripleStoreData();
      expect(tripleStoreData.size).toEqual(9);
    })
  });

  it('Triple Store Array Data is ready', () => {
    return component.service.getIsDataReady().then(()=>{
      const tripleStoreData = component.service.getTripleStoreArrayData();
      expect(tripleStoreData.length).toEqual(9);
    })
  });
});
