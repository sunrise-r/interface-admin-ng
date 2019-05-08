import { Injectable } from '@angular/core';
import {StringHelper} from '../../../../src/lib/shared/helpers/string.helper';

@Injectable()
export class PresentationHelper {
    /**
     * Возвращает чистый код представления без постфикса Presentation
     * @param presentationCode
     */
    cleanPresentationCode(presentationCode: string) {
        presentationCode = StringHelper.parseDotPathFirstSection(presentationCode);
        return presentationCode.replace(/(DataPresentation|Presentation)$/, '');
    }

    /**
     * Возвращает чистый код проекции
     * @param presentationCode
     */
    cleanProjectionCode(presentationCode: string) {
        const projectionCode = StringHelper.parseDotPathLastSection(presentationCode);
        return projectionCode.replace(/(ReferenceListProjection|SourceListProjection|ViewListProjection|ListProjection)$/, '');
    }
}
