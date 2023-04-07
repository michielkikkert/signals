import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {importProvidersFrom} from "@angular/core";
import {RouterModule} from "@angular/router";
import {NestedSignalsComponent} from "./app/nested-signals/nested-signals.component";
import {FormSignalsComponent} from "./app/form-signals/form-signals.component";

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(RouterModule.forRoot([
			{
				path: '',
				component: NestedSignalsComponent
			},
			{
				path: 'form-signals',
				component: FormSignalsComponent
			}
		]))
	]
});


