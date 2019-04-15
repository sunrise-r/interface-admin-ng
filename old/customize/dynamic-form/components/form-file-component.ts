import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from './validation-input';

@Component({
    selector: 'jhi-form-file',
    template: `
    <ng-container [formGroup]="group">
        <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">{{config.label}}</label>
        <div class="col-12 col-lg-{{formControlColumnSize}} input-group">
            <div class="input-group input-wrapper" [ngClass]="{'disabled': config.disabled === true}">
                <jhi-file-upload
                    class="custom-form-control"
                    [formControlName]="config | formatInputName"
                    [inputId]="config.key"
                    [inputReadonly]="config.readonly"
                    styleClass="form-control-thin"
                ></jhi-file-upload>
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
            </div>
        </div>
    </ng-container>`
})
export class FormFileComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
