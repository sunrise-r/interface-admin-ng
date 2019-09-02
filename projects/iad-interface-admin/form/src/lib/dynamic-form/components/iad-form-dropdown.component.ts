import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from '../core/validation-input';
import { IadEventManager } from 'iad-interface-admin/core';
import { IadFieldValuesService } from '../services/iad-field-values.service';

export interface DropdownValuesInterface {
    label: string;
    value: string;
}

@Component({
    selector: 'iad-form-dropdown',
    template: `
        <ng-container [formGroup]="group">
            <label [attr.for]="config.key" class="col-12 col-lg-{{labelColumnSize}} col-form-label">
                {{config.translate ? (config.label | translate) : config.label}}
            </label>
            <div class="col-12 col-lg-{{formControlColumnSize}}">
                <div class="input-wrapper input-group">
                    <ng-template [ngIf]="config.multiple" [ngIfThen]="multipleSelect" [ngIfElse]="singleSelect"></ng-template>
                    <ng-template #multipleSelect>
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
                    </ng-template>
                    <ng-template #singleSelect>
                        <p-dropdown
                            class="custom-form-control"
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
                    </ng-template>
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
        </ng-container>`,
    styles: ['p-dropdown > ::ng-deep .ui-dropdown { height: 100%; }']
})

export class IadFormDropdownComponent extends ValidationInput implements OnInit, AfterViewInit {

    values: DropdownValuesInterface[];

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

    private dropdownValues(): Promise<DropdownValuesInterface[]> {
        const values = this.config.values;
        if (values) {
            if (this.config.valuesUrl) {
                return Promise.resolve(values);

            } else if (this.config.translatePrefix) {
                return this.translateValues(values);

            }
            return Promise.resolve(values.map(value => ({
                label: value,
                value
            })));
        }
        if (this.config.valuesUrl) {
            return this.fieldValuesService.retrieveFieldMap(this.config.valuesUrl)
                .toPromise()
                .then(data => {
                    return data.map(item => ({
                        label: item[this.config.labelField],
                        value: item[this.config.valueField]
                    }));
                });
        }
        return Promise.resolve(values);
    }

    private translateValues(values: string[]): Promise<DropdownValuesInterface[]> {
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
