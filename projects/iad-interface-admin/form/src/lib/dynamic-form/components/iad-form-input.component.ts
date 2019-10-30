import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';

@Component({
    selector: 'iad-form-input',
    template: `
        <ng-container [formGroup]="group">
            <ng-template [ngIf]="config.type !== 'hidden'" [ngIfThen]="shownTpl" [ngIfElse]="inputTpl"></ng-template>
            <ng-template #shownTpl>
                <label [attr.for]="config.key"
                       class="col-12 col-lg-{{labelColumnSize}}
col-form-label">{{config.translate ? (config.label | translate) : config.label}} </label>
                <div class="col-12 col-lg-{{formControlColumnSize}}">
                    <div iadElementFocus class="input-wrapper input-group">
                        <ng-template [ngIf]="config.inputMask" [ngIfThen]="maskedInput" [ngIfElse]="inputTpl"></ng-template>
                        <ng-template #maskedInput>
                            <p-inputMask
                                styleClass="form-control"
                                [formControlName]="config | formatInputName"
                                [inputId]="config.key"
                                [type]="config.type"
                                [readonly]="config.readonly"
                                [unmask]="true"
                                [autoClear]="false"
                                class="custom-form-control"
                                characterPattern="[A-Za-zА-Яа-я]"
                                [mask]="config.inputMask"
                                (onBlur)="onBlur()">
                            </p-inputMask>
                        </ng-template>
                        <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && isInvalid"
                                              caption="Ошибка!" [text]="error" [activated]="true">
                            <ng-template>
                                <iad-icon-outlet icon="fas exclamation-circle" [size]="'1x'" [cssStyle]="{color: 'red'}"></iad-icon-outlet>
                            </ng-template>
                        </iad-tooltip-notifier>
                        <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && !isInvalid"
                                              caption="Поле валидно!" text="Валидация прошла успешно" [activated]="true">
                            <ng-template>
                                <iad-icon-outlet icon="fas check-circle" [size]="'1x'" [cssStyle]="{color: 'green'}"></iad-icon-outlet>
                            </ng-template>
                        </iad-tooltip-notifier>
                    </div>
                </div>
            </ng-template>
            <ng-template #inputTpl><input
                class="form-control form-control-thin"
                [formControlName]="config | formatInputName"
                [id]="config.key"
                [type]="config.type"
                [readonly]="config.readonly"
                [minLength]="config.validators?.minLength"
                [maxLength]="config.validators?.maxLength || 1000"
                (blur)="onBlur()"></ng-template>
        </ng-container>`
})
export class IadFormInputComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(private inputTranslateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(inputTranslateService, el, renderer);
    }

    ngAfterViewInit() {
        if (this.config.type === 'hidden') {
            this.styleClass = 'd-none hidden';
        }
        super.ngAfterViewInit();
    }
}
