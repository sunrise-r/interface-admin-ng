export interface UserSettingInputDTO {
    key: string;
    value: string;
}

export interface GridSettingsStorageInterface {
    getSettings(groupName: string): Promise<UserSettingInputDTO[]>;
    saveSettings(groupName: string, data: UserSettingInputDTO): void;
}
