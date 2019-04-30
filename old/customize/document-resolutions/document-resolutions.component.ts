import { Component, OnInit, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Operation } from 'app/customize/document-resolutions/operation.model';

@Component({
    selector: 'jhi-document-resolutions',
    templateUrl: './document-resolutions.component.html'
})
export class DocumentResolutionsComponent implements OnInit, OnChanges {
    @Input() operations: Operation[] = [];

    imageUrl: string;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, 'document-operations');
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('operations' in changes) {
            this.operations = this.populateResolutionStartDate(changes['operations'].currentValue);
        }
    }

    /**
     * Заполняет дату начала для отображения резолюции
     * @param operations
     */
    populateResolutionStartDate(operations: Operation[]): Operation[] {
        let startDate;
        if (operations) {
            operations.forEach(operation => {
                if (operation && operation.resolutions) {
                    operation.resolutions.forEach(resolution => {
                        resolution.startDate = startDate === undefined ? resolution.creationDate : startDate;
                        startDate = resolution.creationDate;
                    });
                }
            });
        }
        return operations;
    }
}
