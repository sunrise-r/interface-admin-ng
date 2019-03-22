import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { StringHelperService } from './string-helper.service';

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
            let message = StringHelperService.spacesToCamel(error.error.title);
            message = StringHelperService.cleanNonAlphabethical(message);
            return this.translateService.get('error.' + message).toPromise();
        }
        return defaultMessageCode ? this.translateService.get(defaultMessageCode).toPromise() : Promise.resolve(error.message);
    }
}
