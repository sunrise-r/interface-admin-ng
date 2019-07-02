import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';

export interface MultiSelectValuesInterface {
    label: string;
    value: string;
}

@Component({
    selector: 'iad-form-multi-select',
    template: `
        <ng-container [formGroup]="group">
            <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">
                {{config.translate ? (config.label | translate) : config.label}}
            </label>
            <div class="col-12 col-lg-{{formControlColumnSize}}">
                <div class="input-wrapper input-group">
                    <p-multiSelect
                        class="custom-form-control"
                        [selectedItemsLabel]="config.translatePrefix + '.elementsSelected' | translate"
                        [defaultLabel]="config.translatePrefix + '.label' | translate"
                        [panelStyle]="{minWidth: '12em'}"
                        [maxSelectedLabels]="config.maxSelectedLabels"
                        [showHeader]="config.showHeader"
                        [formControlName]="config.key"
                        [id]="config.key"
                        [readonly]="config.readonly"
                        [options]="values"
                        (onBlur)="onBlur()"
                    ></p-multiSelect>
                    <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && isInvalid"
                                          caption="Ошибка!" [text]="error" [activated]="true">
                        <ng-template>
                            <fa-icon [icon]="'exclamation-circle'" [size]="'1x'" [ngStyle]="{color: 'red'}"></fa-icon>
                        </ng-template>
                    </iad-tooltip-notifier>
                    <iad-tooltip-notifier *ngIf="!(config.readonly || config.disabled) && !isInvalid"
                                          caption="Поле валидно!" text="Валидация прошла успешно" [activated]="true">
                        <ng-template>
                            <fa-icon [icon]="'check-circle'" [size]="'1x'" [ngStyle]="{color: 'green'}"></fa-icon>
                        </ng-template>
                    </iad-tooltip-notifier>
                </div>
            </div>
        </ng-container>`
})

export class IadFormMultiSelectComponent extends ValidationInput implements OnInit, AfterViewInit {

    values: MultiSelectValuesInterface[];

    constructor(private inputTranslateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(inputTranslateService, el, renderer);
    }

    ngOnInit() {
        super.ngOnInit();
        this.multiSelectValues().then(values => {this.values = values});
    }

    private multiSelectValues(): Promise<MultiSelectValuesInterface[]> {
        const values = this.config.values;
        if (values) {
            if (this.config.translatePrefix) {
                return this.translateValues(values);
            }
            return Promise.resolve(values.map(value => ({
                label: value,
                value: value
            })));
        }
        return Promise.resolve(values);
    }

    private translateValues(values: string[]): Promise<MultiSelectValuesInterface[]> {
        const translationPaths = values.reduce((acu, v) => Object.assign(acu, {[this.config.translatePrefix + '.' + v]: v}), {});
        return this.inputTranslateService.get(Object.keys(translationPaths)).toPromise()
            .then(translations => {
                return Object.keys(translationPaths).map(path => ({
                    label: translations[path],
                    value: translationPaths[path]
                }));
            });
    }
}
