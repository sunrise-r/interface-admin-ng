import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';

@Component({
    selector: 'iad-form-date',
    styleUrls: ['iad-form-date.component.scss'],
    template: `
    <ng-container [formGroup]="group">
        <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}}
col-form-label">{{config.translate ? (config.label | translate) : config.label}} </label>
        <div class="col-12 col-lg-{{formControlColumnSize}}">
          <div class="input-wrapper input-group">
            <iad-calendar
              class="custom-form-control"
              [dataType]="config.dataType"
              [dateFormat]="config.dateFormat"
              [enableTranslations]="true"
              [formControlName]="config | formatInputName"
              [id]="config.key"
              [readonlyInput]="config.readonly"
              [monthNavigator]="true"
              [yearNavigator]="true"
              yearRange="1931:2040"
              inputStyleClass="form-control form-control-thin"
              styleClass="iad-calendar"
              (onBlur)="onBlur()"></iad-calendar>
            <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && isInvalid"
                                  caption="Ошибка!" [text]="error" [activated]="true">
              <ng-template>
                <fa-icon [icon]="'exclamation-circle'" [size]="'1x'" [ngStyle]="{color: 'red'}"></fa-icon>
              </ng-template>
            </iad-tooltip-notifier>
            <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && !isInvalid"
                                  caption="Поле валидно!" text="Валидация прошла успешно" [activated]="true">
              <ng-template>
                <fa-icon [icon]="'check-circle'" [size]="'1x'" [ngStyle]="{color: 'green'}" ></fa-icon>
              </ng-template>
            </iad-tooltip-notifier>
          </div>
        </div>
    </ng-container>`
})
export class IadFormDateComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
