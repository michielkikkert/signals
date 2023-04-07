import {Component, computed, effect, Signal, signal, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';

type signalRow =  WritableSignal<{ value: string, count: number }>

@Component({
  selector: 'app-nested-signals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nested-signals.component.html',
  styleUrls: ['./nested-signals.component.scss']
})
export class NestedSignalsComponent {
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
    return this.table()[0];
  });

  constructor() {

    effect(() => {
      console.log('--> First row computed approach', this.firstRow()())
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
