import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from './validation-input';

@Component({
    selector: 'iad-form-number',
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
            <iad-tooltip-notifier *ngIf="isInvalid && error" caption="Ошибка!" [text]="error" size="16"></iad-tooltip-notifier>
        </div>
    </ng-container>`
})
export class FormNumberComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
