import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';

@Component({
    selector: 'iad-form-input',
    template: `
        <ng-container [formGroup]="group">
            <label [attr.for]="config.key"
                   class="col-12 col-lg-{{labelColumnSize}} col-form-label">{{config.label}}: </label>
            <div class="col-12 col-lg-{{formControlColumnSize}}">
                <div [ngClass]="{'input-wrapper': config.type !== 'hidden'}">
                    <ng-container *ngIf="config.inputMask; then maskedInput; else simpleInput"></ng-container>
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
                    <ng-template #simpleInput>
                        <input class="form-control"
                            [formControlName]="config | formatInputName"
                            [id]="config.key"
                            [type]="config.type"
                            [readonly]="config.readonly"
                            [maxLength]="config.validators?.maxLength"
                            (blur)="onBlur()">
                    </ng-template>
                </div>
            </div>
        </ng-container>`
})
export class IadFormInputComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
