import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';

@Component({
    selector: 'iad-form-textarea',
    template: `
    <ng-container [formGroup]="group">
        <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">{{config.label}}: </label>
        <div class="col-12 col-lg-{{formControlColumnSize}}">
        <div class="input-group textarea-wrapper">
            <textarea class="form-control"
                   [formControlName]="config | formatInputName"
                   [id]="config.key"
                   [readonly]="config.readonly"
                   [maxLength]="config.validators?.maxLength"
                   (blur)="onBlur()"></textarea>
        </div>
        </div>
    </ng-container>`
})
export class IadFormTextareaComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
