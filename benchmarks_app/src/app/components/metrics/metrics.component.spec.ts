import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsComponent } from './metrics.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { MetricsService } from '../../service/metrics.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../../../environments/environment';
import { EventEmitter } from '@angular/core';

describe('MetricsComponent', () => {
  let component: MetricsComponent;
  let fixture: ComponentFixture<MetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricsComponent ],
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
    fixture = TestBed.createComponent(MetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
