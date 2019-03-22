import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'jhi-checkbox-list-component',
    template: `<ul>
        <li *ngFor="let item of items; let i = index">
            <label class="custom-checkbox" for="{{inputId}}-{{i}}">{{item[labelField] | translate}}
                <input type="checkbox"
                       id="{{inputId}}-{{i}}"
                       [disabled]="disabled(item)"
                       [checked]="item[statusField]"
                       [(ngModel)]="item[statusField]"
                       (ngModelChange)="onChange(item)">
                <span class="checkmark"></span>
            </label>
        </li>
    </ul>`
})
export class CheckboxListComponent {
    @Input() items: any[];
    @Input() inputId: string;
    @Input() statusField = 'status';
    @Input() labelField = 'label';

    @Output() statusChange: EventEmitter<any> = new EventEmitter<any>();

    @Input() disabled = column => false;

    constructor() {
        if (!this.inputId) {
            this.inputId = this.guidGenerator();
        }
    }

    onChange(item) {
        this.statusChange.emit(item);
    }

    guidGenerator(): string {
        return (
            '_' +
            Math.random()
                .toString(36)
                .substr(2, 9)
        );
    }
}
