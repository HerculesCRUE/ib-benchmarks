import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterbarComponent } from './components/footerbar/footerbar.component';
import 'zone.js/dist/zone-testing'

import { 
  BrowserDynamicTestingModule, 
  platformBrowserDynamicTesting 
} 
from '@angular/platform-browser-dynamic/testing';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
        FooterbarComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    console.log(fixture);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


  it(`should have as title 'benchmarks'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('benchmarks');
  });

  it('should exist tag app-navbar in the content', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-navbar')).not.toBeNull();
  });

  it('should exist tag app-footerbar in the content', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-footerbar')).not.toBeNull();
  });

});
