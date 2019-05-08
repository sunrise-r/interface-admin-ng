import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataBufferService {
    private dataSource: Map<string, any> = new Map<string, any>();

    dataUpdated: Subject<DataBufferService> = new Subject<DataBufferService>();

    /**
     * Сохраняет данные в буффер
     * @param key
     * @param data
     */
    setData(key: string, data: any) {
        this.dataSource.set(key, data);
        this.dataUpdated.next(this);
    }

    /**
     * Возвращает данные из буффера
     * @param key
     */
    getData(key: string): any {
        return this.dataSource.get(key);
    }

    /**
     * Возвращает true если данные по ключу чуществуют и равны данным из второго параметра
     * @param key
     * @param data
     */
    areEquals(key: string, data: any): boolean {
        return (
            this.dataSource.has(key) &&
            (typeof this.dataSource.get(key) === 'string' ? this.dataSource.get(key) : JSON.stringify(this.dataSource.get(key))) ===
                (typeof data === 'string' ? data : JSON.stringify(data))
        );
    }

    /**
     * Возвращает данные и удаляет из буфера
     * @param key
     */
    getCleanData(key: string): any {
        const data = this.getData(key);
        this.cleanData(key);
        return data;
    }

    /**
     * Удаляет данные из буфера
     * @param key
     */
    cleanData(key: string) {
        this.dataSource.delete(key);
    }
}
