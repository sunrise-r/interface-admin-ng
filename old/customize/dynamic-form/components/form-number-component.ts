import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from './validation-input';

@Component({
    selector: 'jhi-form-number',
    template: `
    <ng-container [formGroup]="group">
        <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">{{config.label}}</label>
        <div class="col-12 col-lg-{{formControlColumnSize}} input-group">
            <input class="form-control form-control-thin"
                   [formControlName]="config | formatInputName"
                   [id]="config.key"
                   [max]="config.validators?.max"
                   [min]="config.validators?.min"
                   [readonly]="config.readonly"
                   [step]="config.step"
                   (blur)="onBlur()">
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
export class FormNumberComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
