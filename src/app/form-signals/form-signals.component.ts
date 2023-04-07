import {Component, signal, computed, effect} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormGroup, FormsModule, Validators,} from "@angular/forms";
import {FormSignalsDirective} from "./form-signals.directive";

@Component({
  selector: 'app-form-signals',
  standalone: true,
  imports: [FormsModule, JsonPipe, FormSignalsDirective],
  template: `<p>form-signals works!</p>
      <form [signals]="form">
        <input type="text" name="thing1">
        <input type="text" name="thing2">
      </form>
<!--      <div>{{ computedForm() | json }}</div>-->
  `
})
export class FormSignalsComponent {

  public form = {
      updates: this.formUpdate,
      controls: {
          thing1: {value: 'thing1 initial value', validator: Validators.required},
          thing2: {value: '', validator: Validators.required}
      }
  }

  formUpdate(form: FormGroup) {
    console.log(form)
  }

  // form = signal({
  //   thing1: signal('initial value'),
  //   thing2: signal('')
  // });
  //
  // computedForm = computed(() => {
  //   const values: any = {};
  //   Object.entries(this.form()).forEach( ([control, controlSignal]) => {
  //     values[control] = controlSignal();
  //   } );
  //   return values;
  // })
  //
  // constructor() {
  //   effect(() => {
  //      console.log('FORM:', this.computedForm());
  //   })
  // }
}
