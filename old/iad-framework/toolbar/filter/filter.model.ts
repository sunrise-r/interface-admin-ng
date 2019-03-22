export class Filter {
    name: string;
    title: string;
    status: boolean;

    constructor(name: string, title: string, status: boolean) {
        this.name = name;
        this.title = title;
        this.status = status;
    }
}
