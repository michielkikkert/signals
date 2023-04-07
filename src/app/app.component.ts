import {
	ChangeDetectionStrategy,
	Component,
	signal,
	effect,
	computed, WritableSignal, Signal
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {first} from "rxjs";

type signalRow =  WritableSignal<{ value: string, count: number }>

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
	imports: [CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
	public title:  WritableSignal<string> = signal('Hallo');
	public name:  WritableSignal<string> = signal('Michiel');

	public combi: Signal<string> = computed(() => {
		return this.title() + ' ' + this.name();
	})

	public table:  WritableSignal<signalRow[]> = signal([
		signal({value: 'row1', count: 0}),
		signal({value: 'row2', count: 0}),
		signal({value: 'row3', count: 0}),
		signal({value: 'row4', count: 0}),
		signal({value: 'row5', count: 0}),
	])

	firstRow = computed(() => {
		console.log('-COMPUTED!')
		return this.table()[0]();
	}, {
		equal: (a,b) =>  a.value == b.value && a.count === b.count
	})

	constructor() {

		effect(() => {
			console.log('--> First row computed approach', this.firstRow().count)
		});

		effect(() => {
			console.log('without equality', this.table()[0]());
		})

		// effect(() => {
		// 	console.log('Why do I trigger..?')
		// });

		effect(() => {
			this.table()
			console.log('Table Updated!')
		});

		// effect(() => {
		// 	this.table().forEach(row => row()); // This works nicely!
		// 	console.log('A row updated!')
		// });

		// effect(() => {
		// 	this.doStuffWithSignal();
		// })
	}

	doStuffWithSignal() {
		const row = this.table()[1]();
		console.log('effect triggered in function!', row.value);
	}

	randomUpdate() {
		const random = Math.floor(Math.random() * this.table().length);
		this.table()[random].mutate((row) => ({...row, count: row.count++}));
	}

	addRowMutate() {
		this.table.mutate((rows) => {
			rows.push(signal({value: 'added', count: 0}));
		});
	}

	addRowUpdate() {
		this.table.update((rows) => {
			return [...rows, signal({value: 'added', count: 0})]
		});
	}

	incrementRow(row: signalRow): void {
		row.mutate(row => {
			row.count++
		})
	}

}
