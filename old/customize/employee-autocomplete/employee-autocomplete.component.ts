import { Component, ElementRef, forwardRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { EmployeeLookupService } from './employee-lookup.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Employee } from 'app/shared/model/partnerDocuments/employee.model';
import { StringHelperService } from 'app/shared';
import { AutoComplete } from 'primeng/primeng';

export const EMPLOYEE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EmployeeAutocompleteComponent),
    multi: true
};

@Component({
    selector: 'jhi-employee-autocomplete',
    template: `
        <p-autoComplete
            [(ngModel)]="value"
            [placeholder]="placeholder"
            [suggestions]="suggestions"
            (completeMethod)="completeMethod($event)"
            (onSelect)="onSelect($event)"
            inputStyleClass="form-control form-control-thin"
            styleClass="w-100">
        <ng-template let-employee pTemplate="item"><span [innerHTML]="highlightValue(employee)"></span></ng-template>
    </p-autoComplete>`,
    providers: [EMPLOYEE_VALUE_ACCESSOR, EmployeeLookupService]
})
export class EmployeeAutocompleteComponent implements OnInit, ControlValueAccessor {
    /**
     * Html Input Placeholder
     */
    @Input() placeholder: string;

    @ViewChild(AutoComplete) autocomplete: AutoComplete;

    /**
     * Searching term
     */
    term: string;

    /**
     * Found suggestions
     */
    suggestions: string[];

    /**
     * Text to show inside input
     */
    _value: any;
    get value(): any {
        return this._value;
    }
    set value(value: any) {
        this._value = typeof value === 'string' ? value : this.concatValue(value);
    }

    constructor(private lookupService: EmployeeLookupService, private el: ElementRef, private renderer: Renderer2) {}

    onChange = (event: any) => {};
    onTouched = () => {};

    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, 'jhi-employee-autocomplete');
    }

    /**
     * Search suggestions
     * @param event
     */
    completeMethod(event) {
        this.term = event.query;
        const query = event.query;
        this.lookupService.search({ query }).subscribe(data => {
            this.suggestions = data.body;
        });
    }

    onSelect(event) {
        this.autocomplete.inputEL.nativeElement.value = this.concatValue(event);
        this.writeValue(event);
        this.onTouched();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {}

    writeValue(obj: any): void {
        if (!obj) {
            return;
        }
        this.onChange(obj.id);
    }

    /**
     * Create "Employee Full Name (Position)" string
     * @param value
     */
    concatValue(value: Employee) {
        let result = StringHelperService.humanFullName(value);
        if (value.post) {
            result += ' (' + value.post + ')';
        }
        return result;
    }

    /**
     * Highlight term in suggestions
     * @param value
     */
    highlightValue(value: Employee) {
        const reg = new RegExp(this.escapeRegExp(this.term), 'gi');
        return this.concatValue(value).replace(reg, str => '<b>' + str + '</b>');
    }

    escapeRegExp(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
}
