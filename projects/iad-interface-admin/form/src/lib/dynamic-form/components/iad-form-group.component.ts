import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormInputGroup } from '../core/form-input-group';
import { ContextAware } from '../core/context-aware';
import { Subject } from 'rxjs';

@Component({
    selector: 'iad-form-group',
    styleUrls: ['./iad-form-group.component.scss'],
    template: `
        <ng-template #inputDirective let-child>
            <ng-container [iadDynamicField]="child"
                          [inputComponents]="inputComponents"
                          [context]="context"
                          [group]="childGroup"
                          (touched)="onTouched(child)"
                          styleClass="form-row mb-2"></ng-container>
        </ng-template>
        <ng-container [formGroup]="group">
            <ng-template [ngIf]="config.collapsable" [ngIfThen]="collapsableTemplate" [ngIfElse]="childGroupTemplate"></ng-template>
            <ng-template #collapsableTemplate>
                <p-panel #panel [collapsed]="config.collapsed"
                         (onBeforeToggle)="$event.collapsed ? panel.expand($event.event) : panel.collapse($event.event)">
                    <p-header>
                        <div class="block-title link" (click)="panel.toggle($event)">
                            <iad-icon-outlet [configIcon]="panel.collapsed ? 'chevron-down' : 'chevron-up'" cssClass="text-left"></iad-icon-outlet>
                            {{config.translate ? (config.label | translate) : config.label}}
                        </div>
                    </p-header>
                    <div>
                        <ng-template [ngTemplateOutlet]="childGroupTemplate"></ng-template>
                    </div>
                </p-panel>
            </ng-template>
            <ng-template #childGroupTemplate>
                <ng-container [formGroupName]="config.key" *ngIf="childGroup">
                    <ng-template ngFor let-child [ngForOf]="config.children">
                        <ng-template [ngIf]="child.length === 1" [ngIfThen]="singleColumn" [ngIfElse]="multiColumn"></ng-template>
                        <ng-template #singleColumn>
                            <ng-template [ngTemplateOutlet]="inputDirective" [ngTemplateOutletContext]="{$implicit: child[0]}"></ng-template>
                        </ng-template>
                        <ng-template #multiColumn>
                            <div class="form-row">
                                <div *ngFor="let grandChild of child" class="col-12 col-lg-{{calculateColumns(child)}}">
                                    <ng-template [ngTemplateOutlet]="inputDirective" [ngTemplateOutletContext]="{$implicit: grandChild}"></ng-template>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </ng-template>
                    </ng-template>
                </ng-container>
            </ng-template>
        </ng-container>`
})
export class IadFormGroupComponent implements OnInit, ContextAware {
    context: any;

    /**
     * Групап конфигов
     */
    config: FormInputGroup;

    /**
     * Родительская группа контролов
     */
    group: FormGroup;

    /**
     * Дочерняя группа контролов
     */
    childGroup: FormGroup;

    /**
     * Css класс для установки
     */
    styleClass: string;

    /**
     * Компоненты инпутов формы
     * В виде объекта
     * {
     *     [inputKey: string]: any
     * }
     */
    inputComponents: { [param: string]: any } = {};

    /**
     * touched
     */
    touched: Subject<any> = new Subject<any>();

    constructor(public $el: ElementRef, public renderer: Renderer2) {}

    ngOnInit(): void {
        this.childGroup = <FormGroup>this.group.controls[this.config.key];
        if (!this.config.collapsable) {
            this.renderer.addClass(this.$el.nativeElement, 'iad-form-group-flatten');
        }
    }

    /**
     * Определяет размер текущей колонки по количеству колонок
     * @param child
     */
    calculateColumns(child) {
        return Math.ceil(12 / child.length);
    }

    /**
     * Forwarding of current form group touched event
     * @param child
     */
    onTouched(child) {
        this.touched.next(this.config.key);
    }
}
