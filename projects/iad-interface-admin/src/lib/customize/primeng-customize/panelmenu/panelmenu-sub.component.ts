import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PanelMenuSub } from 'primeng/components/panelmenu/panelmenu';

@Component({
    selector: 'iad-panel-menu-sub',
    templateUrl: './panelmenu-sub.component.html',
    styles: [],
    animations: [
        trigger('submenu', [
            state(
                'hidden',
                style({
                    height: '0px'
                })
            ),
            state(
                'visible',
                style({
                    height: '*'
                })
            ),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class PanelMenuSubComponent extends PanelMenuSub {}
