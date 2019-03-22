import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from './validation-input';

@Component({
    selector: 'jhi-form-date',
    template: `
    <ng-container [formGroup]="group">
        <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">{{config.label}}</label>
        <div class="col-12 col-lg-{{formControlColumnSize}} input-group">
            <jhi-calendar class="custom-form-control"
                  [formControlName]="config | formatInputName"
                  [id]="config.key"
                  [enableTranslations]="true"
                  [readonlyInput]="config.readonly"
                  [showTime]="true"
                  [monthNavigator]="true"
                  [yearNavigator]="true"
                  yearRange="1931:2040"
                  styleClass="jhi-calendar"
                  dateFormat="dd.mm.yy"
                  (onBlur)="onBlur()"></jhi-calendar>
            <jhi-tooltip-notifier *ngIf="isInvalid && error" caption="Ошибка!" [text]="error" size="16"></jhi-tooltip-notifier>
        </div>
    </ng-container>`
})
export class FormDateTimeComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
