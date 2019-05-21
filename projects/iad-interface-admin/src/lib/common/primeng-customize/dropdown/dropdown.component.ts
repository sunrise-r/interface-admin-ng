import { Component, forwardRef, ElementRef, Renderer2, ChangeDetectorRef, NgZone, Input, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown';

export const IAD_DROPDOWN_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
};

@Component({
    selector: 'iad-dropdown',
    templateUrl: './dropdown.component.html',
    animations: [
        trigger('overlayAnimation', [
            state(
                'void',
                style({
                    transform: 'translateY(5%)',
                    opacity: 0
                })
            ),
            state(
                'visible',
                style({
                    transform: 'translateY(0)',
                    opacity: 1
                })
            ),
            transition('void => visible', animate('{{showTransitionParams}}')),
            transition('visible => void', animate('{{hideTransitionParams}}'))
        ])
    ],
    providers: [IAD_DROPDOWN_VALUE_ACCESSOR]
})
export class DropdownComponent extends Dropdown {
    @Input() showTransitionOptions = '225ms ease-out';

    @Input() hideTransitionOptions = '195ms ease-in';

    @HostBinding('class.ui-inputwrapper-filled') filled: boolean;

    @HostBinding('class.ui-inputwrapper-focus') focused: boolean;

    constructor(
        public el: ElementRef,
        public renderer: Renderer2,
        private cdr: ChangeDetectorRef,
        public zone: NgZone
    ) {
        super(el, renderer, cdr, zone);
    }

    selectItem(event, option) {
        if (this.selectedOption !== option) {
            this.selectedOption = option;
            this.value = option.value;

            this.onModelChange(this.dataKey ? this.value[this.dataKey] : this.value);
            this.updateEditableLabel();
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    }

    onEditableInputChange(event) {
        this.value = event.target.value;
        this.updateSelectedOption(this.value);
        this.onModelChange(this.dataKey ? this.value[this.dataKey] : this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }

    clear(event: Event) {
        this.clearClick = true;
        this.value = null;
        this.onModelChange(this.dataKey ? this.value[this.dataKey] : this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
        this.updateSelectedOption(this.value);
        this.updateEditableLabel();
        this.updateFilledState();
    }
}
