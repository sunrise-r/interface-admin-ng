export class CmsSetting {
    name: string;
    value: any;

    constructor(name?: string, value?: any) {
        this.name = name;
        this.value = value;
    }
}

export type SettingsCallback = (element: HTMLElement) => CmsSetting;

export interface SettingsProvider {
    getSettings(element: HTMLElement): CmsSetting;
}
