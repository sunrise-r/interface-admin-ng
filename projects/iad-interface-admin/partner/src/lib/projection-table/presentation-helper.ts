import { StringHelper } from 'iad-interface-admin/core';

export class PresentationHelper {
    /**
     * Возвращает чистый код представления без постфикса Presentation
     * @param presentationCode
     */
    static cleanPresentationCode(presentationCode: string) {
        presentationCode = StringHelper.parseDotPathFirstSection(presentationCode);
        return presentationCode.replace(/(DataPresentation|Presentation)$/, '');
    }

    /**
     * Возвращает чистый код проекции
     * @param presentationCode
     */
    static cleanProjectionCode(presentationCode: string) {
        const projectionCode = StringHelper.parseDotPathLastSection(presentationCode);
        return projectionCode.replace(/(ReferenceListProjection|SourceListProjection|ViewListProjection|ListProjection)$/, '');
    }
}
