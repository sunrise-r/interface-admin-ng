import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { StringHelper } from 'iad-interface-admin/core';

import { DocumentListProjection } from '../../model/projection.model';
import { Subject, Subscription } from 'rxjs';
import { ProjectionTab } from './projection-tab.model';

@Component({
    selector: 'iad-tabbed-view',
    templateUrl: './tabbed-view.component.html',
    styles: []
})
export class TabbedViewComponent implements OnChanges, OnDestroy {
    /**
     * Текущее представление
     */
    currentPresentationCode: string;

    /**
     * Проекция текущей таблицы данных
     */
    currentProjection: DocumentListProjection = null;

    /**
     * Список операций по текущему документу
     */
    currentItems: any[] = [];

    /**
     * Subscription to currentItems subject
     */
    currentItemsSubjectSubscription: Subscription;

    /**
     * Список проекций для табов
     */
    @Input() tabProjections: ProjectionTab[];

    /**
     * Subject to subscribe to currentItems change
     */
    @Input() currentItemsSubject: Subject<any[]>;

    /**
     * Стили CSS для projection-table
     */
    @Input() styleCSS: string;

    /**
     * Премещение к проекции
     */
    @Output() navigateToProjection: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Шаблон для вывода таблицы
     */
    @ContentChild('gridTemplate') gridTemplate: TemplateRef<any>;

    ngOnChanges(changes: SimpleChanges): void {
        if ('currentItemsSubject' in changes && this.currentItemsSubject) {
            this.currentItemsSubjectSubscription = this.currentItemsSubject.subscribe(items => {
                this.currentItems = items;
            });
        }
        if ('tabProjections' in changes && changes['tabProjections'].currentValue.length > 0) {
            this.tabProjections = changes['tabProjections'].currentValue;
            this.initTabInfo();
        }
    }

    ngOnDestroy(): void {
        if (this.currentItemsSubjectSubscription) {
            this.currentItemsSubjectSubscription.unsubscribe();
        }
    }

    initTabInfo() {
        const projectionKey = this.findActiveProjectionKey(this.tabProjections);
        const tabObject = this.tabProjections.find(tab => tab.key === projectionKey);
        this.setActiveProjection(tabObject.projection);
        this.setCurrentPresentationCode(projectionKey);
        this.navigateToProjection.emit(projectionKey);
    }

    onNavigateToProjection(event: any, projectionTab: ProjectionTab): void {
        if (this.currentProjection != null) {
            this.currentProjection.active = false;
        }
        this.setActiveProjection(projectionTab.projection);
        this.setCurrentPresentationCode(projectionTab.key);
        this.navigateToProjection.emit(projectionTab.key);
    }

    /**
     * Устанавливает текущую проекцию
     * @param projection
     */
    private setActiveProjection(projection: DocumentListProjection) {
        this.currentProjection = projection;
        this.currentProjection.active = true;
    }

    /**
     * Устанавливает текущий код представления
     */
    private setCurrentPresentationCode(projectionKey) {
        this.currentPresentationCode = this.parsePresentationCode(projectionKey);
    }

    /**
     /**
     * Ищет активную проекцию
     * @param projectionTabs
     */
    private findActiveProjectionKey(projectionTabs: ProjectionTab[]): string {
        projectionTabs.forEach((projectionTab: ProjectionTab) => {
            if (projectionTab.projection.active === true) {
                return projectionTab.key;
            }
        });
        return projectionTabs[0].key;
    }

    /**
     * Парсит код проекции
     */
    private parsePresentationCode(projectionKey: string) {
        return StringHelper.parseDotPathFirstSection(projectionKey);
    }
}
