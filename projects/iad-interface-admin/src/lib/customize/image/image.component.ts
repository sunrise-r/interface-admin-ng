import { Component, Input, SimpleChanges, ElementRef, Renderer2, OnInit, OnChanges } from '@angular/core';

const relativeImagesPath = '../../../content/images/';

@Component({
    selector: 'iad-image',
    template: `<ng-container *ngIf="src; then img; else div"></ng-container>
    <ng-template #img><img class="image" [alt]="alt" [title]="title" [src]="src" [ngStyle]="imageStyle" /></ng-template>
    <ng-template #div><div class="image" [title]="title" [ngStyle]="imageStyle"></div></ng-template>`
})
export class ImageComponent implements OnChanges {
    private _src: any;
    private _defaultSrc: string;
    private _addRelativePath: boolean;

    /**
     * Ресурс картинки
     */
    @Input()
    set src(src: any) {
        this._src = src !== 'undefined' ? src : null;
    }
    get src(): any {
        return this._src || this.defaultImagePath();
    }

    /**
     * Ресурс картинки по умолчанию
     */
    @Input()
    set defaultSrc(src: string) {
        if (!src) {
            return;
        }
        this._addRelativePath = true;
        this._defaultSrc = src;
    }
    get defaultSrc(): string {
        return this._defaultSrc;
    }

    @Input()
    set setDefaultAbsoluteSrc(src: string) {
        if (!src) {
            return;
        }
        this._addRelativePath = false;
        this._defaultSrc = src;
    }

    get addRelativePath(): boolean {
        return this._addRelativePath;
    }

    /**
     * Подпись на случай если картиика не загружено
     */
    @Input() alt = '';

    /**
     * Подпись картинки при наведении курсора
     */
    @Input() title = '';

    /**
     * Стили картинки
     */
    @Input() imageStyle: any = {};

    ngOnChanges(changes: SimpleChanges): void {
        if ('src' in changes && changes['src'].currentValue) {
            this._src = changes['src'].currentValue;
        }
    }

    defaultImagePath(): string {
        const src = this.defaultSrc;
        if (!src || src === 'undefined') {
            return null;
        }
        return (this.addRelativePath ? relativeImagesPath : '') + src;
    }
}
