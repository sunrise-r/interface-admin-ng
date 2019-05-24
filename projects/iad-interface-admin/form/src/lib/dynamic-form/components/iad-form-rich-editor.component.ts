import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';

@Component({
  selector: 'iad-form-rich-editor',
  template: `
    <ng-container [formGroup]="group">
      <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">
        {{config.translate ? (config.label | translate) : config.label}}
      </label>
      <div class="col-12 col-lg-{{formControlColumnSize}} input-group">
        <p-editor class="custom-form-control"
          [formControlName]="config.key"
          [id]="config.key"
          [readonly]="config.readonly"></p-editor>
        <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled)" [hasErrors]="isInvalid"
                              caption="Ошибка!" [text]="error"></iad-tooltip-notifier>
      </div>
    </ng-container>`
})

export class IadFormRichEditorComponent extends ValidationInput implements OnInit, AfterViewInit {
  constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
    super(translateService, el, renderer);
  }
}
