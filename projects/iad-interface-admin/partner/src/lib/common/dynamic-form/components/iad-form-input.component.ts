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
                       class="col-12 col-lg-{{labelColumnSize}} col-form-label">{{config.label}}: </label>
                <div class="col-12 col-lg-{{formControlColumnSize}}">
                    <div class="input-wrapper">
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
                    </div>
                </div>
            </ng-template>
            <ng-template #inputTpl><input class="form-control"
                 [formControlName]="config | formatInputName"
                 [id]="config.key"
                 [type]="config.type"
                 [readonly]="config.readonly"
                 [maxLength]="config.validators?.maxLength"
                 (blur)="onBlur()"></ng-template>
        </ng-container>`
})
export class IadFormInputComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
