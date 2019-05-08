import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { OperationForm } from 'app/documents';

class FileUploadValue {
    constructor(public uuid) {}
}

@Injectable({
    providedIn: 'root'
})
export class DocumentOperationsService {
    constructor(private http: HttpClient) {}

    /**
     * Load information to edit document using operation ID
     * @param operationId
     */
    loadEditInfo(operationId: number): Observable<any> {
        return this.http.get<any>(this.getFullUrl(`partnerdocuments/api/operations/editinfo/${operationId}`), { observe: 'body' });
    }

    /**
     * Factory form saving method
     * @param action
     * @param body
     * @param projectionCode
     * @param operationId
     * @param fileInputKeys
     */
    performOperation(
        action: string,
        body: any,
        projectionCode: string,
        operationId?: number,
        fileInputKeys?: string[]
    ): Observable<HttpResponse<any>> {
        const bodyClone = { ...body };
        return this.performFileOperations(bodyClone, fileInputKeys).pipe(
            switchMap(_body => this.performOperationInner(action, _body, projectionCode, operationId))
        );
    }

    /**
     * Исполняет операции по сохранению файлов и изменению тела запроса перед отправкой JSON данных
     * @param body
     * @param fileInputKeys
     */
    performFileOperations(body: any, fileInputKeys?: string[]): Observable<any> {
        const filesFormData = this.collectFilesFormData(body, fileInputKeys);
        if (filesFormData.length > 0) {
            return this.saveFilesOnMediaServer(filesFormData, fileInputKeys).pipe(
                map(response => {
                    if (response) {
                        const mediaIndices = response;
                        Object.keys(mediaIndices).forEach(fileKey => {
                            const fileKeyArray = this.getFileKeyArray(fileKey);
                            this.addFileIndex(mediaIndices[fileKey], body, fileKeyArray);
                        });
                        body._files = Object.keys(mediaIndices).join(',');
                    }
                    return body;
                })
            );
        }
        return of(body);
    }

    /**
     * Сохраняет файлы на медиа сервере в виде mutipart/form data
     * @param formData
     * @param fileInputKeys
     */
    saveFilesOnMediaServer(
        formData: { key: string; value: FormData }[],
        fileInputKeys?: string[]
    ): Observable<{ [param: string]: string }> {
        const observables: Observable<HttpResponse<any>>[] = [];
        formData.forEach(formDataObject => {
            observables.push(
                this.http.post<any>(this.getFullUrl('/partnercms/media-objects'), formDataObject.value, {
                    observe: 'response'
                })
            );
        });
        return forkJoin(observables).pipe(
            map(responses => {
                const _map: { [param: string]: string } = {};
                responses.forEach((response: HttpResponse<string>, index: number) => {
                    _map[fileInputKeys[index]] = response.body;
                });
                return _map;
            })
        );
    }

    /**
     * Form saving method itself
     * @param action
     * @param body
     * @param projectionCode
     * @param operationId
     */
    performOperationInner(action: string, body: any, projectionCode: string, operationId?: number): Observable<HttpResponse<any>> {
        let url: string, data: any;
        switch (action) {
            case 'create':
                url = '/partnerprocess/api/bp/documents/create/' + projectionCode;
                data = body;
                break;
            case 'edit':
                url = '/partnerprocess/api/bp/operation/start';
                data = this.prepareEditData(action, body, projectionCode, operationId);
                break;
            default:
                url = '/partnerprocess/api/bp/operation/start';
                data = <OperationForm>body;
        }
        return this.http.post<any>(this.getFullUrl(url), data, { observe: 'response' });
    }

    /**
     * Преобразует отправляемые формы в FormData
     * @param body
     */
    createFormData(body: any): FormData {
        const formData = new FormData();
        if (body && JSON.stringify(body) !== '{}') {
            Object.keys(body).forEach(key => {
                formData.append(key, body[key]);
            });
        }
        return formData;
    }

    /**
     * Данные для редактирования должны отправляться в особом формате
     * @param action
     * @param body
     * @param projectionCode
     * @param operationId
     */
    private prepareEditData(action: string, body: any, projectionCode: string, operationId: number): OperationForm {
        return <OperationForm>{
            type: body && body.type ? body.type : action,
            documentSource: body,
            documentId: body.id,
            id: operationId
        };
    }

    /**
     *
     * @param fileKey
     */
    private getFileKeyArray(fileKey: string) {
        return fileKey.indexOf('.') !== -1 ? fileKey.split('.') : [fileKey];
    }

    /**
     * Находит список экземпляров файлов и возвращает его в виде массива объектов { key: string, value: FormData }[]
     * @param body
     * @param fileInputKeys
     */
    private collectFilesFormData(body: any, fileInputKeys?: string[]): { key: string; value: FormData }[] {
        const formData: { key: string; value: FormData }[] = [];
        if (fileInputKeys && fileInputKeys.length > 0) {
            fileInputKeys.forEach(fileKey => {
                const fileKeyArray = this.getFileKeyArray(fileKey);
                const file = this.findFileInstance(body, fileKeyArray);
                if (file) {
                    formData.push({
                        key: fileKey,
                        value: this.createFormData({ file })
                    });
                }
            });
        }
        return formData;
    }

    /**
     *
     * @param file
     * @param fileKeyArray
     * @param index
     */
    private findFileInstance(file: any, fileKeyArray: string[], index = 0): File {
        if (file instanceof File) {
            return file;
        }
        if (file === null || file === undefined || fileKeyArray[index] === undefined) {
            return null;
        }
        return this.findFileInstance(file[fileKeyArray[index]], fileKeyArray, index + 1);
    }

    /**
     * Добавляет в объект индекс
     * @param index
     * @param body
     * @param fileKeyArray
     */
    private addFileIndex(index: string, body: any, fileKeyArray: string[]) {
        let level = body;
        const lastKeyIndex = fileKeyArray.length - 1;
        for (let i = 0; i < lastKeyIndex; i++) {
            level = level[fileKeyArray[i]];
        }
        level[fileKeyArray[lastKeyIndex]] = new FileUploadValue(index);
    }

    private getFullUrl(url: string): string {
        return SERVER_API_URL + url;
    }
}
