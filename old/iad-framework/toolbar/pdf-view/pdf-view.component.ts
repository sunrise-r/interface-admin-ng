import { Component, OnInit, ViewChild } from '@angular/core';

import { ENTITY_TYPE } from '../../model/iad.models';
import { ActualSelectionModel } from '../../data-table';

import { PdfViewService } from './pdf-view.service';

export interface IPdfViewComponent {
    /**
     * Выбранная строка
     */
    selection: ActualSelectionModel;

    /**
     * Entity Type to make correct request
     */
    entityType: ENTITY_TYPE;
}

@Component({
    selector: 'jhi-pdf-view',
    template: `<ng2-pdfjs-viewer #pdfViewer class="content-flex"></ng2-pdfjs-viewer>`,
    providers: [PdfViewService]
})
export class PdfViewComponent implements OnInit, IPdfViewComponent {
    @ViewChild('pdfViewer') pdfViewer;

    /**
     * Выбранная строка
     */
    selection: ActualSelectionModel;

    /**
     * Entity Type to make correct request
     */
    entityType: ENTITY_TYPE;

    constructor(private pdfView: PdfViewService) {}

    ngOnInit(): void {
        this.pdfView
            .card(this.selection.selection.id, this.entityType)
            .toPromise()
            .then((res: Blob) => {
                this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
                this.pdfViewer.refresh(); // Ask pdf viewer to load/reresh pdf
            })
            .catch(err => {
                console.error(err);
            });
    }
}
