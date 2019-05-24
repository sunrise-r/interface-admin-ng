import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';

@Component({
  selector: 'iad-form-checkbox',
  template: `
        <ng-container [formGroup]="group">
            <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">
              {{config.translate ? (config.label | translate) : config.label}}
            </label>
            <div class="col-12 col-lg-{{formControlColumnSize}} input-group">
              <p-checkbox [binary]="'true'"
                          [formControlName]="config.key"
                          [id]="config.key"
              ></p-checkbox>
            </div>
        </ng-container>`,
  styles: [
    'p-checkbox { margin-top: auto; margin-bottom: auto; }'
  ]
})
export class IadFormCheckboxComponent extends ValidationInput implements OnInit, AfterViewInit {
  constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
    super(translateService, el, renderer);
  }
}
