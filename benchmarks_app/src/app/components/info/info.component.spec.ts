import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoComponent } from './info.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { MetricsService } from '../../service/metrics.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../../../environments/environment';
import { EventEmitter } from '@angular/core';

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;
  let event;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoComponent ],
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
      ], 
      providers: [MetricsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a InfoComponent', () => {
    expect(component).toBeTruthy();
  });

  it('MetricService is initialized', () => {
    const compiled = fixture.debugElement.nativeElement;
    console.log('info',compiled);
  });
});
