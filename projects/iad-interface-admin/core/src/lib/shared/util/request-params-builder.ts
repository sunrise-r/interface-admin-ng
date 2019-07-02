import { HttpParameterCodec, HttpParams } from '@angular/common/http';

// @dynamic
export class RequestParamsBuilder {
    static build(req?: any): HttpParams {
        let options: HttpParams = new HttpParams();
        if (req) {
            Object.keys(req).forEach(key => {
                if (key !== 'sort') {
                    options = options.set(key, req[key]);
                }
            });
            if (req.sort) {
                req.sort.forEach(val => {
                    options = options.append('sort', val);
                });
            }
        }
        return options;
    }

    static merge(params1: HttpParams, params2: HttpParams): HttpParams {
        params2.keys().forEach((key => {
            params2.getAll(key).forEach(val => {
                if (params1.has(key)) {
                    params1 = params1.append(key, val);
                } else {
                    params1 = params1.set(key, val);
                }
            });
        }));
        return params1;
    }
}
