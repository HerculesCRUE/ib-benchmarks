import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightsComponent } from './weights.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { MetricsService } from '../../service/metrics.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../../../environments/environment';
import { EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('WeightsComponent', () => {
  let component: WeightsComponent;
  let fixture: ComponentFixture<WeightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightsComponent ],
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        FormsModule
      ], 
      providers: [MetricsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a WeigthComponent', () => {
    expect(component).toBeTruthy();
  });
});
