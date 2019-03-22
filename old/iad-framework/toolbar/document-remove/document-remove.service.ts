import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
// import { OperationForm } from 'app/documents';

@Injectable({
    providedIn: 'root'
})
export class DocumentRemoveService {
    constructor(private http: HttpClient) {}

    /**
     * Запрос операций по документу для вынесения резолюции
     * @param id
     */
    remove(id: number): any {
        const body = { id };
        return this.http.post<any>(SERVER_API_URL + '/partnerprocess/api/bp/operation/start', this.prepareRemoveData(body), {
            observe: 'response'
        });
    }

    /**
     * Данные для редактирования должны отправляться в особом формате
     * @param body
     */
    private prepareRemoveData(body: any) {
        return {
            type: 'delete',
            documentSource: body,
            documentId: body.id
        };
    }
}
