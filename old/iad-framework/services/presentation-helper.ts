import { Injectable } from '@angular/core';
import { StringHelperService } from 'app/shared';

@Injectable()
export class PresentationHelper {
    /**
     * Возвращает чистый код представления без постфикса Presentation
     * @param presentationCode
     */
    cleanPresentationCode(presentationCode: string) {
        presentationCode = StringHelperService.parseDotPathFirstSection(presentationCode);
        return presentationCode.replace(/(DataPresentation|Presentation)$/, '');
    }

    /**
     * Возвращает чистый код проекции
     * @param presentationCode
     */
    cleanProjectionCode(presentationCode: string) {
        const projectionCode = StringHelperService.parseDotPathLastSection(presentationCode);
        return projectionCode.replace(/(ReferenceListProjection|SourceListProjection|ViewListProjection|ListProjection)$/, '');
    }
}
