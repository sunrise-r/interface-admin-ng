import { Component, Input } from '@angular/core';
import { ActualSelectionModel } from '../../data-table';
import { filePath } from 'app/shared';

@Component({
    selector: 'jhi-resolution-preview',
    templateUrl: './resolution-preview.component.html'
})
export class ResolutionPreviewComponent {
    /**
     * Данные для отображения
     */
    @Input() data: any;

    /**
     * Текущая информация о выделенной позиции
     */
    @Input() selection: ActualSelectionModel;

    get variantDefaultSrc(): string {
        // 'REVIEW', 'ACCEPTED', 'REJECTED', 'INFORMED'
        const operationIcons = {
            accepted: 'resolution-accepted',
            rejected: 'resolution-rejected',
            review: 'resolution-review'
        };
        const type = this.selection.documentDTO.status;
        const src = type in operationIcons ? operationIcons[type] : 'resolution-default';
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
