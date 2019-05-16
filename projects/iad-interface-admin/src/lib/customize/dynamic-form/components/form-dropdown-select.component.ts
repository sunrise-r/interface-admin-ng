import {Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from './validation-input';
import {Dropdown} from 'primeng/primeng';

@Component({
  selector: 'iad-form-dropdown',
  template: `
    <ng-container [formGroup]="group">
      <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">
        {{config.translate ? (config.label | translate) : config.label}}
      </label>
      <div class="col-12 col-lg-{{formControlColumnSize}} input-group">
        <p-dropdown class="custom-form-control"
          [id]="config.key"
          [readonly]="config.readonly"
          [options]="dropdownValues(config.translatePrefix, config.values)"
          [required]="config.required"
          [formControlName]="config.key"
          [autoDisplayFirst]="true"
        >
        </p-dropdown>
        <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled)" [hasErrors]="isInvalid"
                              caption="Ошибка!" [text]="error"></iad-tooltip-notifier>
      </div>
    </ng-container>`
})

export class DropdownComponent extends ValidationInput implements OnInit, AfterViewInit {

  constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
    super(translateService, el, renderer);
  }

  dropdownValues(translatePrefix: string, values: string[]) {
    return values.map(value => ({
      label: translatePrefix ? this.translateService.instant(translatePrefix + '.' + value) : value,
      value: value
    }));
  }
}
