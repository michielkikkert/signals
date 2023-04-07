import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedSignalsComponent } from './nested-signals.component';

describe('NestedSignalsComponent', () => {
  let component: NestedSignalsComponent;
  let fixture: ComponentFixture<NestedSignalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NestedSignalsComponent]
    });
    fixture = TestBed.createComponent(NestedSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
