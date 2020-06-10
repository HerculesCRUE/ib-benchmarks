import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterbarComponent } from './footerbar.component';

import 'zone.js/dist/zone-testing'

import { 
  BrowserDynamicTestingModule, 
  platformBrowserDynamicTesting 
} 
from '@angular/platform-browser-dynamic/testing';

/*
beforeAll(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule,
                              platformBrowserDynamicTesting());
})
*/;

describe('FooterbarComponent', () => {
  let component: FooterbarComponent;
  let fixture: ComponentFixture<FooterbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a FooterBar component', () => {
    expect(component).toBeTruthy();
  });
});
