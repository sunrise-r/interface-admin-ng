export interface HasPropertiesInterface {
    properties?: { [p: string]: any };
}

export type OnValidCallback = (val: any) => any;
export type OnInvalidCallback = (name: string, obj: HasPropertiesInterface) => any;

export class IadHelper {
    static getProperty(propertyName: string, defaultValue: any, obj: HasPropertiesInterface) {
        return obj && obj[propertyName] !== undefined && obj[propertyName] !== null ? obj[propertyName] : defaultValue;
    }

    static runPropertyCondition(propertyName: string, obj: HasPropertiesInterface, onValid: OnValidCallback, onInvalid: OnInvalidCallback) {
        return obj && obj[propertyName] !== undefined && obj[propertyName] !== null
            ? onValid(obj[propertyName])
            : onInvalid(propertyName, obj);
    }
}
