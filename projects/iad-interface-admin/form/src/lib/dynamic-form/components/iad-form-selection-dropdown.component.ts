import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';
import { IadEventManager } from 'iad-interface-admin/core';
import { IadFieldValuesService } from '../services/iad-field-values.service';

export interface SelectionDropdownValuesInterface {
    label: string;
    value: string;
}

@Component({
    selector: 'iad-form-selection-dropdown',
    template: `
        <ng-container [formGroup]="group">
            <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">
                {{config.translate ? (config.label | translate) : config.label}}
            </label>
            <div class="col-12 col-lg-{{formControlColumnSize}}">
                <div class="input-wrapper input-group">
                    <p-dropdown class="custom-form-control"
                                [id]="config.key"
                                [readonly]="config.readonly"
                                [options]="values"
                                [required]="config.required"
                                [formControlName]="config.key"
                                [placeholder]="' '"
                                [showClear]="config.showClear"
                                (onChange)="onChange($event)"
                                (onBlur)="onBlur()">
                    </p-dropdown>
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
        </ng-container>`,
    styles: ['p-dropdown > ::ng-deep .ui-dropdown { height: 100%; }']
})

export class IadFormSelectionDropdownComponent extends ValidationInput implements OnInit, AfterViewInit {

    values: SelectionDropdownValuesInterface[];

    constructor(
        private inputTranslateService: TranslateService,
        public el: ElementRef,
        public renderer: Renderer2,
        private eventManager: IadEventManager,
        private fieldValuesService: IadFieldValuesService
    ) {
        super(inputTranslateService, el, renderer);
    }

    ngOnInit() {
        super.ngOnInit();
        this.dropdownValues().then(values => {
            this.values = values;
        });
    }

    onChange(value) {
        this.eventManager.broadcast({name: this.config.key + '#onChange', content: value});
    }

    private dropdownValues(): Promise<SelectionDropdownValuesInterface[]> {
        const values = this.config.values;
        if (values) {
            if (this.config.valuesUrl) {
                return Promise.resolve(values);

            } else if (this.config.translatePrefix) {
                return this.translateValues(values);

            } else {
                return Promise.resolve(values.map(value => ({
                    label: value,
                    value: value
                })));
            }
        }
        if (this.config.valuesUrl) {
            return this.fieldValuesService.retrieveFieldMap(this.config.valuesUrl).toPromise();
        }
        return Promise.resolve(values);
    }

    private translateValues(values: string[]): Promise<SelectionDropdownValuesInterface[]> {
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
