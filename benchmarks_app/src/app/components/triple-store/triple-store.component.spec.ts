import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripleStoreComponent } from './triple-store.component';

describe('TripleStoreComponent', () => {
  let component: TripleStoreComponent;
  let fixture: ComponentFixture<TripleStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripleStoreComponent ]
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
});
