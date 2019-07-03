export type OnValidCallback = (val: any) => any;
export type OnInvalidCallback = (name: string, obj: {[p: string]: any}) => any;

export class IadHelper {
    static getProperty(propertyName: string, defaultValue: any, obj: {[p: string]: any}) {
        return obj && obj[propertyName] !== undefined && obj[propertyName] !== null ? obj[propertyName] : defaultValue;
    }

    static runPropertyCondition(propertyName: string, obj: {[p: string]: any}, onValid: OnValidCallback, onInvalid: OnInvalidCallback) {
        return obj && obj[propertyName] !== undefined && obj[propertyName] !== null
            ? onValid(obj[propertyName])
            : onInvalid(propertyName, obj);
    }

    static toInt(val: any): number {
        if (isNaN(val)) {
            return parseInt(val, 10);
        }
        return val;
    }

    static splice (collection, item, compareProp: string) {
        const index = collection.findIndex(_col => _col[compareProp] === item[compareProp]);
        if (index !== -1) {
            collection.splice(index, 1, item);
        } else {
            collection.push(item);
        }
    };
}
