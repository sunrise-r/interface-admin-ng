export interface UserGetSettingsInterface {
    key: string;
    value: string;
}

export interface UserSetSettingsInterface {
    groupName: string;
    key: string;
    value: string;
}

export interface GridSettingsStorageInterface {
    getSettings(groupName: string): Promise<UserGetSettingsInterface[]>;
    saveSettings(groupName: string, data: UserGetSettingsInterface): void;
}


export class UserGetSettingsDTO implements UserGetSettingsInterface {
    key: string;
    value: string;
    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}

export class UserSetSettingsDTO implements UserSetSettingsInterface {
    groupName: string;
    key: string;
    value: string;
    constructor(groupName: string, key: string, value: string) {
        this.groupName = groupName;
        this.key = key;
        this.value = value;
    }
}
