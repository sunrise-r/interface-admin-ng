import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from './validation-input';

@Component({
    selector: 'iad-form-textarea',
    template: `
    <ng-container [formGroup]="group">
        <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">
          {{config.translate ? (config.label | translate) : config.label}}
        </label>
        <div class="col-12 col-lg-{{formControlColumnSize}} input-group">
            <textarea class="form-control form-control-thin"
                   [formControlName]="config | formatInputName"
                   [id]="config.key"
                   [readonly]="config.readonly"
                   [minLength]="config.validators?.minLength"
                   [maxLength]="config.validators?.maxLength || 1000"
                   (blur)="onBlur()"></textarea>
            <iad-tooltip-notifier [hasErrors]="isInvalid && error" caption="Ошибка!" [text]="error"></iad-tooltip-notifier>
        </div>
    </ng-container>`
})
export class FormTextareaComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
