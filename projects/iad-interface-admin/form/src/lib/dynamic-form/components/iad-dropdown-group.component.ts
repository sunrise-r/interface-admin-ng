import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {FormInputGroup} from '../core/form-input-group';
import {ContextAware} from '../core/context-aware';

@Component({
  selector: 'iad-dropdown-group',
  template: `
    <ng-container [formGroup]="group">
      <p-panel #panel [collapsed]="config.collapsed"
               (onBeforeToggle)="$event.collapsed ? panel.expand($event.event) : panel.collapse($event.event)">
        <p-header>
          <div class="block-title link" (click)="panel.toggle($event)">
            <fa-icon [icon]="panel.collapsed ? 'chevron-down' : 'chevron-up'" class="text-left">
            </fa-icon> {{config.translate ? (config.label | translate) : config.label}}
          </div>
        </p-header>
        <div [formGroupName]="config.key" *ngIf="childGroup">
          <ng-template ngFor let-child [ngForOf]="config.children">
            <div [iadDynamicField]="child[0]" [inputComponents]="inputComponents" [context]="context" [group]="childGroup"
                 styleClass="form-row mb-2"
                 *ngIf="child.length === 1; else multiColumn"></div>
            <ng-template #multiColumn>
              <div class="form-row mb-2">
                <div *ngFor="let grandChild of child; let i = index"
                     class="col-12 col-lg-{{calculateColumns(child)}}">
                  <ng-container [iadDynamicField]="grandChild" [inputComponents]="inputComponents" [group]="childGroup" [context]="context"
                                styleClass="form-row mb-2"></ng-container>
                </div>
                <div class="clearfix"></div>
              </div>
            </ng-template>
          </ng-template>
        </div>
      </p-panel>
    </ng-container>`
})
export class IadDropdownGroupComponent implements OnInit, ContextAware {
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
