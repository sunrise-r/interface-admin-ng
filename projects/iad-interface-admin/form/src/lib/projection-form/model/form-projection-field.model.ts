export const DISABLED = 'DISABLED';
export const READONLY = 'READONLY';

export interface IFormProjectionField {
    label: string;
    name: string;
    type: string; // Тип отображаемого филда. (напр. DateTime, Date, String, Lookup, Entity, List и тд)
    column?: number; // Номер колонки дял показа в форме (в форме поля могут быть раскиданы по колонкам)
    fieldInputType?: string; // DISABLED/READONLY/Null
    defaultValue?: string; // Знкачение по умолчанию, заданное в проекции
    presentationCode?: string; // Код представления для запроса мета-информации, содержащей проекции Lookup или Reference.
    lookupSourceProjectionCode?: string; // Код лист-проекции для отображения ресурсов Lookup (список, с предложениями для выбора в Lookup)
    lookupViewProjectionCode?: string; // Код лист-проекции для отображения данных в Lookup
    referenceProjectionCode?: string; // Код форм-проекции, которую нужно отобразить как вложенную группу полей данной формы
    translate?: boolean; // Производится перевод по метке
    inputMask?: string; // Маска ввода для плагинов ввода по маске
    validationTypes?: {
        email?: boolean;
        required?: boolean;
        minLength?: string;
        maxLength?: string;
    };
    valueField?: string; // Название поля, по которому следует определять значение этого поля. Было сделаано для Lookup, но может быть применено к другим полям
    dataSourcePath?: string; // Путь к данным, разделённый точками для заполнения поля значениями по умолчанию. Было сделаано для Lookup, но может быть применено к другим полям
    datasourcePath?: string; // @invalid!
    properties?: any; // key=>value с кастомными свойствами,
}
