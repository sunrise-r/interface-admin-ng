export interface HasPropertiesInterface {
    properties?: { [p: string]: any };
}

export type OnValidCallback = (val: any) => any;
export type OnInvalidCallback = (name: string, obj: HasPropertiesInterface) => any;

export class IadHelper {
    static getProperty(propertyName: string, defaultValue: any, obj: HasPropertiesInterface) {
        return obj.properties && obj.properties[propertyName] ? obj.properties[propertyName] : defaultValue;
    }

    static runPropertyCondition(propertyName: string, obj: HasPropertiesInterface, onValid: OnValidCallback, onInvalid: OnInvalidCallback) {
        return obj.properties && obj.properties[propertyName] ? onValid(obj.properties[propertyName]) : onInvalid(propertyName, obj);
    }
}
