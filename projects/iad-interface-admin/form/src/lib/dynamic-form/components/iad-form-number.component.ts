import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';

@Component({
    selector: 'iad-form-number',
    template: `
    <ng-container [formGroup]="group">
        <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}}
col-form-label">{{config.translate ? (config.label | translate) : config.label}}: </label>
        <div class="col-12 col-lg-{{formControlColumnSize}} input-group">
            <input
              class="form-control form-control-thin"
              [formControlName]="config | formatInputName"
              [id]="config.key"
              [max]="config.validators?.max"
              [min]="config.validators?.min"
              [readonly]="config.readonly"
              [step]="config.step"
              (blur)="onBlur()" />
          <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled)" [hasErrors]="isInvalid"
                                caption="Ошибка!" [text]="error"></iad-tooltip-notifier>
        </div>
    </ng-container>`
})
export class IadFormNumberComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
