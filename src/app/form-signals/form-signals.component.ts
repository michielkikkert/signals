import {Component, signal, computed, effect} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormsModule, } from "@angular/forms";

@Component({
  selector: 'app-form-signals',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  template: `<p>form-signals works!</p>
      <form>
        <input type="text" name="thing1" [ngModel]="form().thing1()" (ngModelChange)="form().thing1.set($event)">
        <input type="text" name="thing1" [ngModel]="form().thing2()" (ngModelChange)="form().thing2.set($event)">
      </form>
      <div>{{ computedForm() | json }}</div>
  `,
  styleUrls: ['./form-signals.component.scss']
})
export class FormSignalsComponent {

  form = signal({
    thing1: signal('initial value'),
    thing2: signal('')
  });

  computedForm = computed(() => {
    const values: any = {};
    Object.entries(this.form()).forEach( ([control, controlSignal]) => {
      values[control] = controlSignal();
    } );
    return values;
  })

  constructor() {
    effect(() => {
       console.log('FORM:', this.computedForm());
    })
  }
}
