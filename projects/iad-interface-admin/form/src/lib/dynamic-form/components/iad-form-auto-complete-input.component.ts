import {Component, OnInit, AfterViewInit, ElementRef, Renderer2} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {ValidationInput} from '../core/validation-input';
import {IadFieldValuesService} from '../services/iad-field-values.service';

@Component({
    selector: 'iad-form-auto-complete-input',
    template: `
        <ng-container [formGroup]="group">
            <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">
                {{config.translate ? (config.label | translate) : config.label}}
            </label>
            <div class="col-12 col-lg-{{formControlColumnSize}}">
                <div class="input-wrapper input-group">
                    <p-autoComplete class="custom-form-control"
                                    [id]="config.key"
                                    [readonly]="config.readonly"
                                    [required]="config.required"
                                    [formControlName]="config.key"
                                    [suggestions]="suggestions"
                                    [multiple]="config.multiple"
                                    (completeMethod)="suggestionValues($event.query)"
                                    (onBlur)="onBlur()">
                    </p-autoComplete>
                    <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && isInvalid"
                                          caption="Ошибка!" [text]="error" [activated]="true">
                        <ng-template>
                            <fa-icon [icon]="'exclamation-circle'" [size]="'2x'" [ngStyle]="{color: 'red'}"></fa-icon>
                        </ng-template>
                    </iad-tooltip-notifier>
                    <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && !isInvalid"
                                          caption="Поле валидно!" text="Валидация прошла успешно" [activated]="true">
                        <ng-template>
                            <fa-icon [icon]="'check-circle'" [size]="'2x'" [ngStyle]="{color: 'green'}"></fa-icon>
                        </ng-template>
                    </iad-tooltip-notifier>
                </div>
            </div>
        </ng-container>`
})
export class IadFormAutoCompleteInputComponent extends ValidationInput implements OnInit, AfterViewInit {

    suggestions: string[];

    constructor(private inputTranslateService: TranslateService, public el: ElementRef, public renderer: Renderer2,
                private fieldValuesService: IadFieldValuesService) {
        super(inputTranslateService, el, renderer);
    }

    suggestionValues(input = '') {
        this.fieldValuesService.retrieveFieldMap(this.config.valuesUrl + (input.trim() ? '?filter=' + input.trim() : ''))
            .subscribe(suggestions => this.suggestions = suggestions);
    }
}
