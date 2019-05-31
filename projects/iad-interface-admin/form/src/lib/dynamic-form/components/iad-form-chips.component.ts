import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';

@Component({
  selector: 'iad-form-chips',
  styles: ['iad-form-chips.component.scss'],
  template: `
    <ng-container [formGroup]="group">
      <label [attr.for]="config.key"class="col-12 col-lg-{{labelColumnSize}} col-form-label">
        {{config.translate ? (config.label | translate) : config.label}}
      </label>
      <div class="col-12 col-lg-{{formControlColumnSize}}">
        <div class="input-wrapper input-group">
          <p-chips [formControlName]="config.key"
                   [id]="config.key"
                   (onBlur)="onBlur()"
          ></p-chips>
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

export class IadFormChipsComponent extends ValidationInput implements OnInit, AfterViewInit {
  constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
    super(translateService, el, renderer);
  }
}
