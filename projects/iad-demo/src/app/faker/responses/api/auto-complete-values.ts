import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

import { AbstractResponse } from '../abstract.response';

export const autoCompleteValuesConditionCallback = (request) => {
    return request.url.match(/api\/auto-complete-values/) && request.method === 'GET';
};

export class AutoCompleteValuesResponse extends AbstractResponse {
    getResponse(): Observable<HttpResponse<string[]>> {
        const filter = this.request.url.split('?filter=')[1];
        const data = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
        const filteredData = filter ? data.filter(value => value.toLowerCase().indexOf(filter.toLowerCase()) !== -1) : data;
        return of(new HttpResponse({status: 200, body: filteredData}));
    }
}
