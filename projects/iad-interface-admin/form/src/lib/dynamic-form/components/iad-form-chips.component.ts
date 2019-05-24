import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';

@Component({
  selector: 'iad-form-chips',
  styles: ['form-chips.component.scss'],
  template: `
    <ng-container [formGroup]="group">
      <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">
        {{config.translate ? (config.label | translate) : config.label}}
      </label>
      <div class="col-12 col-lg-{{formControlColumnSize}} input-group">
        <p-chips class="custom-form-control"
          [formControlName]="config.key"
          [id]="config.key"
        ></p-chips>
        <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled)" [hasErrors]="isInvalid"
                              caption="Ошибка!" [text]="error"></iad-tooltip-notifier>
      </div>
    </ng-container>`
})

export class IadFormChipsComponent extends ValidationInput implements OnInit, AfterViewInit {
  constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
    super(translateService, el, renderer);
  }
}
