import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';

@Component({
  selector: 'iad-form-multi-select',
  template: `
    <ng-container [formGroup]="group">
      <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">
        {{config.translate ? (config.label | translate) : config.label}}
      </label>
      <div class="col-12 col-lg-{{formControlColumnSize}}">
        <div class="input-wrapper input-group">
          <p-multiSelect
            class="custom-form-control"
            [selectedItemsLabel]="config.translatePrefix + '.elementsSelected' | translate"
            [defaultLabel]="config.translatePrefix + '.label' | translate"
            [panelStyle]="{minWidth: '12em'}"
            [maxSelectedLabels]="config.maxSelectedLabels"
            [showHeader]="config.showHeader"
            [formControlName]="config.key"
            [id]="config.key"
            [readonly]="config.readonly"
            [options]="multiSelectValues(config.translatePrefix, config.values)"
            (onBlur)="onBlur()"
          ></p-multiSelect>
          <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && isInvalid"
                                caption="Ошибка!" [text]="error" [activated]="true">
            <ng-template>
              <fa-icon [icon]="'exclamation-circle'" [size]="'2x'" [ngStyle]="{color: 'red'}"></fa-icon>
            </ng-template>
          </iad-tooltip-notifier>
          <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && !isInvalid"
                                caption="Поле валидно!" text="Валидация прошла успешно" [activated]="true">
            <ng-template>
              <fa-icon [icon]="'check-circle'" [size]="'2x'" [ngStyle]="{color: 'green'}" ></fa-icon>
            </ng-template>
          </iad-tooltip-notifier>
        </div>
      </div>
    </ng-container>`
})

export class IadFormMultiSelectComponent extends ValidationInput implements OnInit, AfterViewInit {
  constructor(private inputTranslateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
    super(inputTranslateService, el, renderer);
  }

  multiSelectValues(translatePrefix: string, values: string[]) {
    return values.map(value => ({
      label: translatePrefix ? this.inputTranslateService.instant(translatePrefix + '.' + value) : value,
      value: value
    }));
  }
}
