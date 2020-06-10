import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

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
});
*/

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a Navbar Component', () => {
    expect(component).toBeTruthy();
  });

  it('NavBar should cointains all routes', () => {
    const routes = new Set(['#','metrics',"triple-stores","weights","memory","benchmarks","results","info"])
    const compiled = fixture.debugElement.nativeElement;
    compiled.querySelectorAll('a').forEach(e => {
      const route = e.href;
      const r = route.substring(route.lastIndexOf("/")+1,route.lenght);
      routes.delete(r);
    });
    console.log(routes);
    expect(routes.size).toEqual(0);
  });
});
