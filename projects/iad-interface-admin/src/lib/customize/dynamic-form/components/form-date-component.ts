import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from './validation-input';

@Component({
    selector: 'iad-form-date',
    template: `
    <ng-container [formGroup]="group">
        <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">
          {{config.translate ? (config.label | translate) : config.label}}
        </label>
        <div class="col-12 col-lg-{{formControlColumnSize}} input-group">
            <iad-calendar class="custom-form-control"
                  [formControlName]="config | formatInputName"
                  [id]="config.key"
                  [enableTranslations]="true"
                  [readonlyInput]="config.readonly"
                  [monthNavigator]="true"
                  [yearNavigator]="true"
                  yearRange="1931:2040"
                  inputStyleClass="form-control form-control-thin"
                  styleClass="iad-calendar"
                  dateFormat="dd.mm.yy"
                  (blur)="onBlur()"></iad-calendar>
          <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled)" [hasErrors]="isInvalid"
                                caption="Ошибка!" [text]="error"></iad-tooltip-notifier>
        </div>
    </ng-container>`
})
export class FormDateComponent extends ValidationInput implements OnInit, AfterViewInit {
    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
