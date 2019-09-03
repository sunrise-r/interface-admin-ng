import { Injectable } from '@angular/core';
import { ObjectUtils } from 'primeng/components/utils/objectutils';

@Injectable()
export class IadObjectUtils extends ObjectUtils {
    /**
     * Will resolve field if value was given as string, but expected as object
     * @param data
     * @param field
     */
    static resolveFieldData(data: any, field: any): any {
        if (data && field) {
            if (ObjectUtils.isFunction(field)) {
                return field(data);
            } else if (typeof data === 'string' || typeof data === 'number') {
                return data;
            } else if (field.indexOf('.') === -1) {
                return data[field];
            } else {
                const fields: string[] = field.split('.');
                let value = data;
                for (let i = 0, len = fields.length; i < len; ++i) {
                    if (value === null) {
                        return null;
                    }
                    value = value[fields[i]];
                }
                return value;
            }
        } else {
            return null;
        }
    }
}
