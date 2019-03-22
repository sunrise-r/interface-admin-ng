import { SERVER_API_URL } from 'app/app.constants';

export const filePath = function(id: string) {
    if (!id) {
        return null;
    }
    return SERVER_API_URL + `partnercms/media-objects/${id}`;
};
