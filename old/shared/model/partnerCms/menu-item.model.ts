import { IMenuItem } from 'app/shared/model/partnerCms/menu-item.model';

export interface IMenuItem {
    id?: number;
    label?: string;
    role?: string;
    url?: string;
    code?: string;
    order?: number;
    menuItems?: IMenuItem[];
    parentId?: number;
}

export class MenuItem implements IMenuItem {
    constructor(
        public id?: number,
        public label?: string,
        public role?: string,
        public url?: string,
        public code?: string,
        public order?: number,
        public menuItems?: IMenuItem[],
        public parentId?: number
    ) {}
}
