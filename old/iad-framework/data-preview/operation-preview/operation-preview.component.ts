import { Component, Input } from '@angular/core';
import { ActualSelectionModel } from '../../data-table';
import { filePath } from 'app/shared';

@Component({
    selector: 'jhi-operation-preview',
    templateUrl: './operation-preview.component.html'
})
export class OperationPreviewComponent {
    /**
     * Данные для отображения
     */
    @Input() data: any;

    /**
     * Текущая информация о выделенной позиции
     */
    @Input() selection: ActualSelectionModel;

    get variantDefaultSrc(): string {
        const operationIcons = {
            archive: 'operation-archive',
            new: 'operation-create',
            discard: 'operation-discard',
            divide: 'operation-divide',
            merge: 'operation-merge',
            fromArchive: 'operation-from-archive'
        };
        const type = this.selection.selection.operationType;
        const src = type in operationIcons ? operationIcons[type] : 'operation';
        return `cards/${src}.png`;
    }

    /**
     * Получает url изображения
     * @param id
     */
    getImageUrl(id: string) {
        return filePath(id);
    }
}
