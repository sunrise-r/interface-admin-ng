import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from './validation-input';

@Component({
    selector: 'jhi-form-input',
    template: `
        <ng-container [formGroup]="group">
            <label [attr.for]="config.key"
                   class="col-12 col-lg-{{labelColumnSize}} col-form-label">{{config.label}}</label>
            <div class="col-12 col-lg-{{formControlColumnSize}}">
            <div  class="input-group" [ngClass]="{'input-wrapper': config.type !== 'hidden'}">
                <ng-container *ngIf="config.inputMask; then maskedInput; else simpleInput"></ng-container>
                <ng-template #maskedInput>
                    <p-inputMask
                        styleClass="form-control form-control-thin"
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
                <ng-template #simpleInput>
                    <input class="form-control form-control-thin"
                        [formControlName]="config | formatInputName"
                        [id]="config.key"
                        [type]="config.type"
                        [readonly]="config.readonly"
                        [maxLength]="config.validators?.maxLength"
                        (blur)="onBlur()">
                </ng-template>
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
            </div>
        </ng-container>`
})
export class FormInputComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
