import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';

@Component({
    selector: 'iad-form-date',
    template: `
    <ng-container [formGroup]="group">
        <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">{{config.label}}: </label>
        <div class="col-12 col-lg-{{formControlColumnSize}}">
            <p-calendar class="custom-form-control"
                [formControlName]="config | formatInputName"
                [id]="config.key"
                [readonlyInput]="config.readonly"
                [showTime]="true"
                [monthNavigator]="true"
                [yearNavigator]="true"
                yearRange="1931:2040"
                styleClass="jhi-calendar"
                dateFormat="dd.mm.yy"
                (onBlur)="onBlur()"></p-calendar>
        </div>
    </ng-container>`
})
export class IadFormDateTimeComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
