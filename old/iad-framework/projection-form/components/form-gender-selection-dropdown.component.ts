import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from 'app/customize/dynamic-form/components/validation-input';
import { SEX } from '../inputs/gender-selection-dropdown-input.model';

@Component({
    selector: 'jhi-form-gender-selection-dropdown',
    template: `
        <!-- [multiple]="config.multiple" -->
        <ng-container [formGroup]="group">
            <label [attr.for]="config.key"
                   class="col-12 col-lg-{{labelColumnSize}} col-form-label">{{config.label}}</label>
            <div class="col-12 col-lg-{{formControlColumnSize}} input-group">
                <jhi-dropdown [style]="{width:'100%'}"
                              [readonly]="config.readonly"
                              [id]="config.key"
                              [options]="sourceItems"
                              [formControlName]="config | formatInputName"
                              optionLabel="name"
                              dataKey="code"></jhi-dropdown>
                <jhi-tooltip-notifier *ngIf="isInvalid && error" caption="Ошибка!" [text]="error"
                                      size="16"></jhi-tooltip-notifier>
            </div>
        </ng-container>`
})
export class FormGenderSelectionDropdownComponent extends ValidationInput implements OnInit, AfterViewInit {
    sourceItems: { name: string; code: SEX }[] = [];
    constructor(
        translateService: TranslateService,
        public el: ElementRef,
        public renderer: Renderer2,
        public translationService: TranslateService
    ) {
        super(translateService, el, renderer);
    }

    ngOnInit() {
        super.ngOnInit();
        this.translationService.get(this.config.sourceItems.map(item => item.name)).subscribe(translations => {
            this.sourceItems = this.config.sourceItems.map(item => {
                item.name = translations[item.name];
                return item;
            });
        });
    }
}
