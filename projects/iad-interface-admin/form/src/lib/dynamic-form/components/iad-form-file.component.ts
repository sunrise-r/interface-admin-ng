import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';

@Component({
    selector: 'iad-form-file',
    styleUrls: ['./iad-form-file.component.scss'],
    template: `
    <ng-container [formGroup]="group">
        <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}}
col-form-label">{{config.translate ? (config.label | translate) : config.label}} </label>
        <div class="col-12 col-lg-{{formControlColumnSize}}">
            <iad-file-upload
                class="custom-form-control"
                [formControlName]="config | formatInputName"
                [inputId]="config.key"
                [inputReadonly]="config.readonly"
                styleClass="form-control-thin"
                (onBlur)="onBlur()"
            ></iad-file-upload>
        </div>
    </ng-container>`
})
export class IadFormFileComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
