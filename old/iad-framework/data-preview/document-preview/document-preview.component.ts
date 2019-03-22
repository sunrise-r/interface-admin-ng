import { Component, Input } from '@angular/core';
import { StringHelperService } from 'app/shared';

@Component({
    selector: 'jhi-document-preview',
    templateUrl: './document-preview.component.html'
})
export class DocumentPreviewComponent {
    /**
     * Данные для отображения
     */
    @Input() data: any;

    /**
     * Текущее имя запрашиваемой сущности или тип операции/резолюции
     */
    @Input() presentationCode: string;

    /**
     * Поле, из которого берётся фотогррафия по умолчанию
     */
    @Input() documentPhotoField: string;

    image;

    get variantDefaultSrc(): string {
        let src = StringHelperService.camelToKebab(this.presentationCode);
        if (!src) {
            src = 'default-employee';
        }
        return `cards/${src}.png`;
    }

    /**
     * Получает url изображения
     */
    get imageUrl(): string {
        if (!this.documentPhotoField) {
            return null;
        }
        return this.data[this.documentPhotoField] ? this.data[this.documentPhotoField].url : null;
    }
}
