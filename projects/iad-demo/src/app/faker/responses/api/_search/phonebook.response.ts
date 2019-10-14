import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AbstractResponse } from '../../abstract.response';
import { PhoneBook } from '../../model/phonebook.model';

export const phonebookConditionCallback = (request) => {
    return request.url.match(/api\/_search\/phonebook$/) && request.method === 'GET';
};

// IadProjectionInterface
export class PhonebookResponse extends AbstractResponse {
    data: PhoneBook[];

    getResponse(): Observable<HttpResponse<PhoneBook[]>> {
        if (!this.data) {
            this.data = [];
            for (let i = 1; i < 6; i++) {
                this.data.push(new PhoneBook(i));
            }
        }
        let data = this.data.map((item: PhoneBook) => item.clone());
        const sort = this.request.params.get('sort');
        if (sort) {
            const [sortField, sortDirection] = sort.split(',');
            console.log('sort by ' + sort);
            const mapper1 = data.map((item: PhoneBook, i) => ({index: i, value: item[sortField]}));
            const sorted =  mapper1.sort((i1: any, i2: any) => (
                    (i1.value > i2.value ? 1 : (i1.value < i2.value ? -1 : 0)) * (sortDirection === 'asc' ? 1 : -1)
                ));
            data = sorted.map(i => data[i.index]);
        }


        const size: number = parseInt(this.request.params.get('size'), 10) || 0;
        const page: number = parseInt(this.request.params.get('page'), 10) || 0;
        const offset = size * page;
        const limit = offset + size;
        const currentPageData = data.filter(item => item.id > offset && item.id <= limit);

        const headers = new HttpHeaders({'X-Total-Count': data.length.toString()});
        return of(new HttpResponse({status: 200, body: currentPageData, headers: headers}));
    }
}





