import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DATA_DEPENDENCY_LEVEL } from '../model/projection.model';

class ActualSelectionData {
    constructor(public name: string, public model: any = null) {
    }
}

@Injectable({
    providedIn: 'root'
})
export class ActualSelectionChainService {
    previousDataState: ActualSelectionData[];

    data: ActualSelectionData[];

    dataIsChanged: Subject<any | null> = new Subject<any>();

    constructor() {
        this.data = this.initSelectionData();
        this.previousDataState = this.initSelectionData();
    }

    setData(data: any) {
        this.setSelectionData(<DATA_DEPENDENCY_LEVEL>data.type, data);
        this.dataIsChanged.next(data);
    }

    unsetData(data?: any) {
        if (!data) {
            this.resetBuffer();
            return;
        }

        this.setSelectionData(<DATA_DEPENDENCY_LEVEL>data.type, null);
        const level = this.findIndexByType(this.data, <DATA_DEPENDENCY_LEVEL>data.type);
        this.broadcastLevelData(level);
    }

    /**
     * Транслирует данные более высокого уровня или null
     * @param level
     */
    broadcastLevelData(level) {
        if (level > 0) {
            const previousLevel = level - 1;
            const previousLevelData = this.data[previousLevel].model;
            if (previousLevelData) {
                this.dataIsChanged.next(previousLevelData);
            } else {
                this.broadcastLevelData(previousLevel);
            }
        } else {
            this.dataIsChanged.next(null);
        }
    }

    /**
     * Устанавливает значение для выбранного уровня
     * @param type
     * @param value
     */
    setSelectionData(type: DATA_DEPENDENCY_LEVEL, value: any) {
        const index = this.findIndexByType(this.data, type);
        this.previousDataState.forEach((model: ActualSelectionData, _index: number) => {
            this.previousDataState[_index].model = this.data[_index].model;
        });
        this.data[index].model = value;
    }

    /**
     * инициализация данных
     */
    initSelectionData() {
        return [
            new ActualSelectionData(DATA_DEPENDENCY_LEVEL.DOCUMENT, null),
            new ActualSelectionData(DATA_DEPENDENCY_LEVEL.OPERATION, null),
            new ActualSelectionData(DATA_DEPENDENCY_LEVEL.REFERENCE, null)
        ];
    }

    /**
     * Возвращает true, если данные
     * @param type
     */
    isDataChangedByType(type: DATA_DEPENDENCY_LEVEL) {
        const index = this.findIndexByType(this.data, type);
        return this.data[index].model !== this.previousDataState[index].model;
    }

    /**
     * Сброс буфера
     */
    resetBuffer() {
        this.data = this.initSelectionData();
        this.previousDataState = this.initSelectionData();
        this.dataIsChanged.next(null);
    }

    /**
     * Ищет уровень зависимости по типу
     * @param data
     * @param type
     */
    private findIndexByType(data: ActualSelectionData[], type: DATA_DEPENDENCY_LEVEL) {
        return data && data.findIndex(selectionData => selectionData.name === type);
    }
}
