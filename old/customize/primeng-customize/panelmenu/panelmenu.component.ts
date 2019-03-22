import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PanelMenu } from 'primeng/components/panelmenu/panelmenu';

@Component({
    selector: 'jhi-panel-menu',
    templateUrl: './panelmenu.component.html',
    styles: [],
    animations: [
        trigger('rootItem', [
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
export class PanelMenuComponent extends PanelMenu {}
