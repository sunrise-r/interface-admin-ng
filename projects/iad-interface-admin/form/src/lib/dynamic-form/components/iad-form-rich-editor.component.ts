import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';

@Component({
  selector: 'iad-form-rich-editor',
  styleUrls: ['./iad-form-rich-editor.component.scss'],
  template: `
    <ng-container [formGroup]="group">
      <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">
        {{config.translate ? (config.label | translate) : config.label}}
      </label>
      <div class="col-12 col-lg-{{formControlColumnSize}}">
        <div iadElementFocus class="input-wrapper input-group rich-editor-wrapper">
          <p-editor class="custom-form-control"
            [formControlName]="config.key"
            [id]="config.key"
            [readonly]="config.readonly"></p-editor>
          <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && isInvalid"
                                caption="Ошибка!" [text]="error" [activated]="true">
            <ng-template>
                <iad-icon-outlet icon="fas exclamation-circle" [size]="'1x'" [cssStyle]="{color: 'red'}"></iad-icon-outlet>
            </ng-template>
          </iad-tooltip-notifier>
          <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && !isInvalid"
                                caption="Поле валидно!" text="Валидация прошла успешно" [activated]="true">
            <ng-template>
                <iad-icon-outlet icon="fas check-circle" [size]="'1x'" [cssStyle]="{color: 'green'}"></iad-icon-outlet>
            </ng-template>
          </iad-tooltip-notifier>
        </div>
      </div>
    </ng-container>`
})

export class IadFormRichEditorComponent extends ValidationInput implements OnInit, AfterViewInit {
  constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
    super(translateService, el, renderer);
  }
}
