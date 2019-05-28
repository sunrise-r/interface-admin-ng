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
      <div class="col-12 col-lg-{{formControlColumnSize}}">
        <div class="input-wrapper input-group">
          <p-editor class="custom-form-control"
            [formControlName]="config.key"
            [id]="config.key"
            [readonly]="config.readonly"></p-editor>
          <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && isInvalid" caption="Ошибка!" [text]="error">
            <ng-template let-content="content" let-position="position"
                         let-tooltipStyleClass="tooltipStyleClass" let-escape="escape">
              <fa-icon
                [icon]="'exclamation-circle'" [size]="'2x'" [ngStyle]="{color: 'red'}"
                [iadPTooltip]="content" [tooltipPosition]="position" [tooltipStyleClass]="tooltipStyleClass" [escape]="false"
              ></fa-icon>
            </ng-template>
          </iad-tooltip-notifier>
          <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && !isInvalid" caption="Поле валидно!"
                                text="Валидация прошла успешно">
            <ng-template let-content="content" let-position="position"
                         let-tooltipStyleClass="tooltipStyleClass" let-escape="escape">
              <fa-icon
                [icon]="'check-circle'" [size]="'2x'" [ngStyle]="{color: 'green'}"
                [iadPTooltip]="content" [tooltipPosition]="position" [tooltipStyleClass]="tooltipStyleClass" [escape]="false"
              ></fa-icon>
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
