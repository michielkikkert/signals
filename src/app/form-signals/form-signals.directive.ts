import {Directive, inject, Input, OnInit} from '@angular/core';
import {ControlContainer} from "@angular/forms";

@Directive({
	selector: 'form[signals]',
	standalone: true
})
export class FormSignalsDirective implements OnInit{

    private componentForm = inject(ControlContainer);
    @Input() signals: any;

	constructor() {
        console.log('Directive works', this.componentForm, this.signals);
    }

	ngOnInit() {

		console.log('Directive works', this.componentForm, this.signals);

	}

}
