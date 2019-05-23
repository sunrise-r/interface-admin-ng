import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class DataChainLevel {
    constructor(
        public data: any,
        public code: string,
        public dependent: string[] // dependent levels
    ) {}

    clone() {
        const data = this.data || {};
        return new DataChainLevel(Object.assign({}, data), this.code, this.dependent);
    }
}

/**
 * Необходимо сделать, что будет ещё возможность создавать экземпляры хранилища с набором зависимостей.
 * вместо previousData нужно сделать мап ,в котоором ключи будут названиями хранилища, а значения - наборр зависящих данных.
 * У хранилища можно указывать зависимости, типа одно очищается при снятии выделения, и нужно вернуть предыдущее.
 * Типа
 * по умолчанию хранилище забивается данными профиля пользователя,
 * Но можно кликнуть по записи в аккаунтах или контактах и тогда чтобы данные не были перекрыты, нужно учесть, что мы показываем данные последнего клика. Затем все уровни
 *, т.е.
 * Документ -> Операция -> Справочники
 * А когда снимаем клик надо снова показать данные пользователя на уровне "документ".
 */
@Injectable({
    providedIn: 'root'
})
export class DataChainService {
    /**
     * previous data heap
     */
    previousData: DataChainLevel[] = [];

    /**
     * data heap
     */
    data: DataChainLevel[] = [];

    /**
     * Subject to tell external class about state change event
     */
    dataIsChanged: Subject<any> = new Subject<any>();

    add(code: string, data: any, dependent: string[] = []) {
        // saving current state
        this.fillPreviousData();

        // replacing level with specified code and do not touch its dependent levels
        this.replaceLevelByCode(code, new DataChainLevel(data, code, dependent));
    }

    reset(code?: string) {
        if (!code) {
            this.data = [];
            this.previousData = [];
            this.dataIsChanged.next(null);
            return;
        }
        this.fillPreviousData();
        const level = this.findDependencyLevelByCode(this.data, code);
        if (level) {
            this.dropCascade(code);
            this.dataIsChanged.next(level.data);
        } else {
            this.dataIsChanged.next(null);
        }
    }

    /**
     * Return true if prev and curr data are equals;
     * @param code
     */
    isDataChanged(code: string) {
        const prev = this.findLevelByCode(this.previousData, code);
        const curr = this.findLevelByCode(this.data, code);
        return JSON.stringify(prev) !== JSON.stringify(curr);
    }

    /**
     * Drops level and all its dependent levels cascade
     * @param code
     */
    private dropCascade(code) {
        const index = this.findIndexByCode(this.data, code);
        if (index !== -1) {
            const removed: DataChainLevel[] = this.data.splice(index, 1);
            const deps = removed[0] ? removed[0].dependent : [];
            if (deps && deps.length > 0) {
                deps.forEach(dep => {
                    this.dropCascade(dep);
                });
            }
        }
    }

    /**
     * Replace level by level code
     * @param code
     * @param level
     */
    private replaceLevelByCode(code: string, level: DataChainLevel) {
        const index = this.findIndexByCode(this.data, code);
        if (index !== -1) {
            this.data[index] = level;
        }
    }

    /**
     * Finds data heap level by level code;
     * Useful to replace specific level;
     * @param data
     * @param code
     */
    private findLevelByCode(data: DataChainLevel[], code: string): DataChainLevel {
        return data && data.find(level => level.code === code);
    }

    /**
     * Finds data heap index by level code;
     * Useful to replace specific level;
     * @param data
     * @param code
     */
    private findIndexByCode(data: DataChainLevel[], code: string): number {
        return data && data.findIndex(level => level.code === code);
    }

    /**
     * Find FIRST dependency in data by code of dependent level
     * @param data
     * @param code
     */
    private findDependencyLevelByCode(data: DataChainLevel[], code: string): DataChainLevel {
        return data.find(level => level.dependent.indexOf(code) === -1);
    }

    /**
     * fills previous data with current data information
     */
    private fillPreviousData() {
        this.previousData = this.data.map(level => level.clone());
    }
}
