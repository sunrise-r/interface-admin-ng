import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationInput } from 'app/customize/dynamic-form/components/validation-input';
import { ContextAware } from 'app/customize/dynamic-form/context-aware';

@Component({
    selector: 'jhi-form-lookup',
    template: `
        <ng-container [formGroup]="group">
            <jhi-grid-lookup-view
                [disableDropdown]="config.disableDropdown"
                [formControlName]="config | formatInputName"
                [id]="config.key"
                [items]="config.items"
                [label]="config.label"
                [lookupSourceProjectionCode]="config.lookupSourceProjectionCode"
                [lookupViewProjectionCode]="config.lookupViewProjectionCode"
                [multiple]="config.multiple"
                [presentationCode]="config.presentationCode"
                [readonly]="config.readonly"
                [sourceItems]="config.sourceItems"
                [showFilter]="config.showFilter"
                [valueField]="config.valueField"
                [context]="context"
                class="col-12"></jhi-grid-lookup-view>
        </ng-container>`
})
export class FormLookupComponent extends ValidationInput implements OnInit, AfterViewInit, ContextAware {
    @Input() public context: any = null;

    constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(translateService, el, renderer);
    }
}
