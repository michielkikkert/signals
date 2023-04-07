import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	SettableSignal,
	signal,
	effect,
	computed
} from '@angular/core';
import {CommonModule} from '@angular/common';

type signalRow = SettableSignal<{ value: string, count: number }>

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
	imports: [CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
	public title: SettableSignal<string> = signal('Hallo');
	public name: SettableSignal<string> = signal('Michiel');

	public combi = computed(() => {
		return this.title() + ' ' + this.name();
	})

	public table: SettableSignal<signalRow[]> = signal([
		signal({value: 'row1', count: 0}),
		signal({value: 'row2', count: 0}),
		signal({value: 'row3', count: 0}),
		signal({value: 'row4', count: 0}),
		signal({value: 'row5', count: 0}),
	])

	ngOnInit() {
		// this.title.set('title set');

		effect(() => {
			console.log('Why do I trigger..?')
		});

		effect(() => {
			this.table()
			console.log('Table Updated!')
		});

		effect(() => {
			this.table().forEach(row => row()); // This works nicely!
			console.log('A row updated!')
		});

		effect(() => {
			const row = this.table()[0]();
			console.log('Row 0 updated to', row.count)
		});
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
