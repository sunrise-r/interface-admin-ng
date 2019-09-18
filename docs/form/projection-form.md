[InterfaceAdminNg](../../../../../../README.md) / [Usage](../../../../../../docs/2-usage-guide.md) / Projection form

# Projection form

## FormProjection field model

Field name | Type | Description
---------- | ---- | -----------
label | string | Перевод или переведённое название поля
name | string | Имя поля формы
type | string |  [Тип отображаемого филда](#input-types-with-models)
column? | number |  Номер колонки дял показа в форме (в форме поля могут быть раскиданы по колонкам)
fieldInputType? | string |  DISABLED/READONLY/Null
defaultValue? | string |  Знкачение по умолчанию, заданное в проекции
presentationCode? | string | Код представления для запроса мета-информации, содержащей проекции Lookup или Reference.
lookupSourceProjectionCode? | string | Код лист-проекции для отображения ресурсов Lookup (список, с предложениями для выбора в Lookup)
lookupViewProjectionCode? | string | Код лист-проекции для отображения данных в Lookup
referenceProjectionCode? | string | Код форм-проекции, которую нужно отобразить как вложенную группу полей данной формы
translate? | boolean | Производится перевод по метке
inputMask? | string | Маска ввода для плагинов ввода по маске
validationTypes? | object | Типы валидации: 
. | . | {
. | . | email?: boolean;
. | . | required?: boolean;
. | . | minLength?: string;
. | . | maxLength?: string;
. | . | };
valueField? | string | Название поля, по которому следует определять значение этого поля. Было сделаано для Lookup, но может быть применено к другим полям
datasourcePath? | string | Путь к данным, разделённый точками для заполнения поля значениями по умолчанию. Было сделаано для Lookup, но может быть применено к другим полям
properties? | object | key=>value с кастомными свойствами 

## Usage in formProjection
    fields: [
      {
        'validationTypes': {'email': false, 'required': false},
        'type': 'Hidden',
        'name': 'hiddenStatus',
        'label': 'Скрытый статус',
        'defaultValue': 'SuperHiddenStatus',
        'datasourcePath': 'properties.status.hiddenStatusValue'
        'column': 0,
        'translate': true,
        'properties': {}
      }
    ],... 
