import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {ValidationInput} from './validation-input';
import {IadEventManager} from '../../../public-services/event-manager.service';
import {IadFieldValuesService} from '../../../projection-form/services/iad-field-values.service';

@Component({
  selector: 'iad-form-selection-dropdown',
  styleUrls: ['dropdown.component.scss'],
  template: `
    <ng-container [formGroup]="group">
      <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">
        {{config.translate ? (config.label | translate) : config.label}}
      </label>
      <div class="col-12 col-lg-{{formControlColumnSize}} input-group">
        <p-dropdown class="custom-form-control"
          [id]="config.key"
          [readonly]="config.readonly"
          [options]="dropdownValues()"
          [required]="config.required"
          [formControlName]="config.key"
          [placeholder]="' '"
          (onChange)="onChange($event)"
        >
        </p-dropdown>
        <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled)" [hasErrors]="isInvalid"
                              caption="Ошибка!" [text]="error"></iad-tooltip-notifier>
      </div>
    </ng-container>`
})

export class FormSelectionDropdownComponent extends ValidationInput implements OnInit, AfterViewInit {

  valuesRequested: boolean;

  constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2,
              private eventManager: IadEventManager, private fieldValuesService: IadFieldValuesService) {
    super(translateService, el, renderer);
  }

  dropdownValues() {
    if (this.config.values) {
      if (this.config.valuesUrl) {
        return this.config.values;
      } else {
        return this.config.values.map(value => ({
          label: this.config.translatePrefix ? this.translateService.instant(this.config.translatePrefix + '.' + value) : value,
          value: value
        }));
      }
    } else if (this.config.valuesUrl && !this.valuesRequested) {
      this.fieldValuesService.retrieveFieldMap(this.config.valuesUrl).subscribe(valuesMap => {
        this.config.values = valuesMap;
      }, () => { this.config.values = []; });
      this.valuesRequested = true;
    }
    return this.config.values = [];
  }

  onChange(value) {
    this.eventManager.broadcast({ name: this.config.key + '#onChange', content: value });
  }
}
