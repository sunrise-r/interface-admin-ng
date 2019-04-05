import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from './validation-input';

@Component({
    selector: 'iad-form-file',
    template: `
    <ng-container [formGroup]="group">
        <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">
          {{config.translate ? (config.label | translate) : config.label}}
        </label>
        <div class="col-12 col-lg-{{formControlColumnSize}} input-group">
            <iad-file-upload
                class="custom-form-control"
                [formControlName]="config | formatInputName"
                [inputId]="config.key"
                [inputReadonly]="config.readonly"
                styleClass="form-control-thin"
            ></iad-file-upload>
        </div>
    </ng-container>`
})
export class FormFileComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
