import { SERVER_API_URL } from 'app/app.constants';

/**
 * Resolves file path
 * If path is guid it will concatenated with default path
 * @param path
 */
export const filePath = function(path: string) {
    if (!path) {
        return null;
    }
    return SERVER_API_URL + (path.indexOf('/') !== -1 ? path : `partnercms/media-objects/${path}`);
};
