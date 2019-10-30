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
                <div iadElementFocus class="input-wrapper input-group">
                    <p-autoComplete class="custom-form-control"
                                    [id]="config.key"
                                    [forceSelection]="config.forceSelection"
                                    [formControlName]="config.key"
                                    [multiple]="config.multiple"
                                    [readonly]="config.readonly"
                                    [required]="config.required"
                                    [suggestions]="suggestions"
                                    (completeMethod)="suggestionValues($event.query)"
                                    (onBlur)="onBlur()">
                    </p-autoComplete>
                    <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && isInvalid"
                                          caption="Ошибка!" [text]="error" [activated]="true">
                        <ng-template>
                            <iad-icon-outlet icon="fas exclamation-circle" [size]="'1x'" [cssStyle]="{color: 'red'}"></iad-icon-outlet>
                        </ng-template>
                    </iad-tooltip-notifier>
                    <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && !isInvalid"
                                          caption="Поле валидно!" text="Валидация прошла успешно" [activated]="true">
                        <ng-template>
                            <iad-icon-outlet icon="fas check-circle" [size]="'1x'" [cssStyle]="{color: 'green'}"></iad-icon-outlet>
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
