import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {StringHelper} from '../helpers/string.helper';

@Injectable({
    providedIn: 'root'
})
export class FormHelperService {
    constructor(private translateService: TranslateService) {}

    /**
     * Показывает ошибку сервера
     * @param error
     * @param defaultMessageCode
     */
    prepareServerError(error: HttpErrorResponse, defaultMessageCode?: string): Promise<string> {
        if (error.error) {
            let message = StringHelper.spacesToCamel(error.error.title);
            message = StringHelper.cleanNonAlphabethical(message);
            return this.translateService.get('error.' + message).toPromise();
        }
        return defaultMessageCode ? this.translateService.get(defaultMessageCode).toPromise() : Promise.resolve(error.message);
    }
}
