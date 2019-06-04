import {Component, OnInit, AfterViewInit, ElementRef, Renderer2} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {ValidationInput} from '../core/validation-input';

@Component({
  selector: 'iad-form-translate-input',
  template: `
    <ng-container [formGroup]="group">
        <label [attr.for]="config.key"
               class="col-12 col-lg-{{labelColumnSize}}
col-form-label">{{config.translate ? (config.label | translate) : config.label}} </label>
        <div class="col-12 col-lg-{{formControlColumnSize}}">
            <div class="input-wrapper input-group">
                <input
                    class="form-control form-control-thin"
                    [formControlName]="config | formatInputName"
                    [id]="config.key"
                    type="text"
                    [readonly]="true"
                    [value]="inputValue()"
                    (blur)="onBlur()">
            </div>
        </div>
    </ng-container>`
})
export class IadFormTranslateInputComponent extends ValidationInput implements OnInit, AfterViewInit {
  constructor(private inputTranslateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
    super(inputTranslateService, el, renderer);
  }

  inputValue() {
    return this.config.translateValue ? this.inputTranslateService.instant(this.config.value) : this.config.value;
  }
}
