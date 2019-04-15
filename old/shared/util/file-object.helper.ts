export class FileObjectHelper {
    static extract(object: any, key: string, field: string) {
        return object && object[key] ? object[key][field] : null;
    }
}
