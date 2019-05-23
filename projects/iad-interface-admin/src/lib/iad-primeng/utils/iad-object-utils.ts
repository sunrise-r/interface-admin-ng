import { Injectable } from '@angular/core';
import { ObjectUtils } from 'primeng/components/utils/objectutils';

@Injectable()
export class CustomObjectUtils extends ObjectUtils {
    public resolveFieldData(data: any, field: any): any {
        if (data && field) {
            if (this.isFunctionCustom(field)) {
                return field(data);
            } else if (typeof data === 'string') {
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

    private isFunctionCustom = (obj: any) => !!(obj && obj.constructor && obj.call && obj.apply);
}
