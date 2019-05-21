import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from './validation-input';

@Component({
  selector: 'iad-form-multi-select',
  template: `
    <ng-container [formGroup]="group">
      <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">
        {{config.translate ? (config.label | translate) : config.label}}
      </label>
      <div class="col-12 col-lg-{{formControlColumnSize}} input-group">
        <p-multiSelect class="custom-form-control"
          [selectedItemsLabel]="config.translatePrefix + '.elementsSelected' | translate"
          [defaultLabel]="config.translatePrefix + '.label' | translate"
          [panelStyle]="{minWidth: '12em'}"
          [maxSelectedLabels]="config.maxSelectedLabels"
          [showHeader]="config.showHeader"
          [formControlName]="config.key"
          [id]="config.key"
          [readonly]="config.readonly"
          [options]="multiSelectValues(config.translatePrefix, config.values)"
        ></p-multiSelect>
        <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled)" [hasErrors]="isInvalid"
                              caption="Ошибка!" [text]="error"></iad-tooltip-notifier>
      </div>
    </ng-container>`
})

export class FormMultiSelectComponent extends ValidationInput implements OnInit, AfterViewInit {
  constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
    super(translateService, el, renderer);
  }

  multiSelectValues(translatePrefix: string, values: string[]) {
    return values.map(value => ({
      label: translatePrefix ? this.translateService.instant(translatePrefix + '.' + value) : value,
      value: value
    }));
  }
}