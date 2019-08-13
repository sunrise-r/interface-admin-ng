import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormInputGroup } from '../core/form-input-group';
import { ContextAware } from '../core/context-aware';

@Component({
    selector: 'iad-form-group',
    styleUrls: ['./iad-form-group.component.scss'],
    template: `
        <ng-container [formGroup]="group">
            <ng-template [ngIf]="config.collapsable" [ngIfThen]="collapsableTemplate" [ngIfElse]="childGroupTemplate"></ng-template>
            <ng-template #collapsableTemplate>
                <p-panel #panel [collapsed]="config.collapsed"
                         (onBeforeToggle)="$event.collapsed ? panel.expand($event.event) : panel.collapse($event.event)">
                    <p-header>
                        <div class="block-title link" (click)="panel.toggle($event)">
                            <iad-icon-outlet [icon]="panel.collapsed ? 'chevron-down' : 'chevron-up'" cssClass="text-left"></iad-icon-outlet>
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
                        <div [iadDynamicField]="child[0]" [inputComponents]="inputComponents" [context]="context" [group]="childGroup"
                             styleClass="form-row mb-2"
                             *ngIf="child.length === 1; else multiColumn"></div>
                        <ng-template #multiColumn>
                            <div class="form-row mb-2">
                                <div *ngFor="let grandChild of child; let i = index"
                                     class="col-12 col-lg-{{calculateColumns(child)}}">
                                    <ng-container [iadDynamicField]="grandChild" [inputComponents]="inputComponents" [group]="childGroup"
                                                  [context]="context"
                                                  styleClass="form-row mb-2"></ng-container>
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

    ngOnInit(): void {
        this.childGroup = <FormGroup>this.group.controls[this.config.key];
    }

    /**
     * Определяет размер текущей колонки по количеству колонок
     * @param child
     */
    calculateColumns(child) {
        return Math.ceil(12 / child.length);
    }
}
