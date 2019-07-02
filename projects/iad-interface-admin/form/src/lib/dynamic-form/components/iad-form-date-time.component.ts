import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';

@Component({
    selector: 'iad-form-date-time',
    styleUrls: ['iad-form-date.component.scss'],
    template: `
    <ng-container [formGroup]="group">
        <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}}
col-form-label">{{config.translate ? (config.label | translate) : config.label}} </label>
        <div class="col-12 col-lg-{{formControlColumnSize}}">
          <div class="input-wrapper input-group">
            <iad-calendar
              class="custom-form-control"
              [formControlName]="config | formatInputName"
              [id]="config.key"
              [enableTranslations]="true"
              [readonlyInput]="config.readonly"
              [showTime]="true"
              [monthNavigator]="true"
              [yearNavigator]="true"
              inputStyleClass="form-control form-control-thin"
              yearRange="1931:2040"
              styleClass="iad-calendar"
              dateFormat="dd.mm.yy"
              (onBlur)="onBlur()"></iad-calendar>
            <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && isInvalid"
                                  caption="Ошибка!" [text]="error" [activated]="true">
              <ng-template>
                <fa-icon [icon]="'exclamation-circle'" [size]="'2x'" [ngStyle]="{color: 'red'}"></fa-icon>
              </ng-template>
            </iad-tooltip-notifier>
            <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && !isInvalid"
                                  caption="Поле валидно!" text="Валидация прошла успешно" [activated]="true">
              <ng-template>
                <fa-icon [icon]="'check-circle'" [size]="'2x'" [ngStyle]="{color: 'green'}" ></fa-icon>
              </ng-template>
            </iad-tooltip-notifier>
          </div>
        </div>
    </ng-container>`
})
export class IadFormDateTimeComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
