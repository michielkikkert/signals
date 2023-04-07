import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSignalsComponent } from './form-signals.component';

describe('FormSignalsComponent', () => {
  let component: FormSignalsComponent;
  let fixture: ComponentFixture<FormSignalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormSignalsComponent]
    });
    fixture = TestBed.createComponent(FormSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
