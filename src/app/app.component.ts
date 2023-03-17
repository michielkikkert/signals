import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    SettableSignal,
    signal
} from '@angular/core';
import { CommonModule } from '@angular/common';

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
    public title: SettableSignal<string> = signal('');
    public table: SettableSignal<signalRow[]> = signal([
        signal({value: 'row1', count: 0}),
        signal({value: 'row2', count: 0}),
        signal({value: 'row3', count: 0}),
        signal({value: 'row4', count: 0}),
        signal({value: 'row5', count: 0}),
    ])

    ngOnInit() {
       this.title.set('title set')
;    }

    randomUpdate() {
        this.table.update( (rows) => {
            const random = Math.floor(Math.random() * rows.length);
            rows[random].mutate((row) => ({...row, count: row.count++})) ;
            return rows;
        });
    }

    addRow() {
        this.table.mutate((rows) => {
            rows.push(signal({value: 'added', count: 0}));
        });
    }

    incrementRow(row: signalRow):void {
        row.mutate( row => {
            row.count++
        })
    }

}
