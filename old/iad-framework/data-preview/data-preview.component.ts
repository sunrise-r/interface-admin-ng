import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { StringHelperService } from 'app/shared';
import { DocumentDataProjection, IADPresentation, PRESENTATION_TYPE, ActualSelectionModel, PresentationLoader } from '../';

@Component({
    selector: 'jhi-data-preview',
    templateUrl: './data-preview.component.html',
    styles: []
})
export class DataPreviewComponent implements OnInit, OnChanges {
    /**
     * Список доступных для отображения вариантов данных
     */
    presentation: IADPresentation;

    /**
     * Проекция отображения данных
     */
    projection: DocumentDataProjection;

    /**
     * Данные для отображения
     */
    data: any;

    /**
     * Текущая информация о выделенной позиции
     */
    selection: ActualSelectionModel;

    /**
     * Текущее имя запрашиваемой сущности или тип операции/резолюции
     */
    presentationCode: string;

    constructor(private presentationService: PresentationLoader) {}

    ngOnInit() {
        this.initViewModel();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('selection' in changes) {
            this.initViewModel();
        }
    }

    initViewModel(): void {
        this.data = this.concatSelectionData(this.selection);
        this.presentationCode = this.resolvePresentationCode();
        this.presentationService.load(this.presentationCode, PRESENTATION_TYPE.DATA).subscribe((presentation: IADPresentation) => {
            if (presentation) {
                this.presentation = presentation;
                this.projection = presentation.dataProjections[0];
            }
        });
    }

    changeSection(section) {
        this.projection = section;
    }

    /**
     * Разрешает код представления
     */
    resolvePresentationCode() {
        return this.selection.properties.className
            ? StringHelperService.parseDotPathLastSection(this.selection.properties.className)
            : this.selection.type;
    }

    /**
     * Объединяет данные выделения
     * @param selection
     */
    concatSelectionData(selection: ActualSelectionModel) {
        if (JSON.stringify(selection.documentIndex) === '{}' && JSON.stringify(selection.documentDTO) === '{}') {
            return selection.selection;
        }
        return Object.assign({}, selection.documentDTO, selection.documentIndex);
    }
}
