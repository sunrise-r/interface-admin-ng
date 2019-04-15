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
              <ng-template [ngIf]="config.type !== 'hidden'">
                  <jhi-tooltip-notifier
                      styleClass="require-tooltip"
                      [activated]="config.validators.required"
                      caption="Внимание!"
                      text="Это поле обязательно к заполнению."
                      size="16"></jhi-tooltip-notifier>
                  <jhi-tooltip-notifier
                      styleClass="error-tooltip"
                      [activated]="isInvalid && error"
                      caption="Ошибка!"
                      [text]="error"
                      size="16"></jhi-tooltip-notifier>
              </ng-template>
        </div>
    </ng-container>`
})
export class FormDateTimeComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
