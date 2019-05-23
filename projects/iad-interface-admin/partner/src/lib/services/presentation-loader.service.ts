import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {IADPresentation} from '../model/projection.model';
import {PRESENTATION_TYPE, PresentationService} from './presentation.service';

@Injectable({
    providedIn: 'root'
})
export class PresentationLoader {
    presentations: Map<string, IADPresentation>;

    constructor(private http: HttpClient, private presentationService: PresentationService) {
        this.presentations = new Map<string, IADPresentation>();
    }

    public load(code: string, type: PRESENTATION_TYPE): Observable<IADPresentation> {
        const storeKey = code + type;
        if (this.presentations.has(storeKey)) {
            return of(this.presentations.get(storeKey));
        }
        return this.presentationService.find(code, type).pipe(
            map((resp: IADPresentation) => {
                if (!resp) {
                    return null;
                }
                this.presentations.set(storeKey, resp);
                return this.presentations.get(storeKey);
            }),
            catchError(err => {
                console.log('Error in PresentationLoader');
                console.error(err);
                return of(new IADPresentation());
            })
        );
    }

    /**
     * Загружает представление common
     */
    public loadCommonPresentation(): Observable<IADPresentation> {
        return this.load('common', PRESENTATION_TYPE.COMMON);
    }
}
