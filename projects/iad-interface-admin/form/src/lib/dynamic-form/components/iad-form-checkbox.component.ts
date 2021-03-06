import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';

@Component({
  selector: 'iad-form-checkbox',
  styleUrls: ['./iad-form-checkbox.component.scss'],
  template: `
        <ng-container [formGroup]="group">
            <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">
              {{config.translate ? (config.label | translate) : config.label}}
            </label>
            <div class="col-12 col-lg-{{formControlColumnSize}}">
              <p-checkbox [binary]="'true'"
                          [formControlName]="config.key"
                          [id]="config.key"
                          (onBlur)="onBlur()"
              ></p-checkbox>
            </div>
        </ng-container>`
})
export class IadFormCheckboxComponent extends ValidationInput implements OnInit, AfterViewInit {
  constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
    super(translateService, el, renderer);
  }
}
