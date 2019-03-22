import { IHuman } from '../model/human.model';

export class StringHelperService {
    /**
     * Camelize kebab-case or spaced string
     * @param item
     * @param lower
     * @param type
     * @returns {string}
     */
    static toCamelCase(item: string, lower = false, type = 'kebab'): string {
        if (!item) {
            return 'undefined';
        }
        const expr = {
            kebab: /(-[a-zA-Z])/g,
            space: /(\s[a-zA-Z])/g
        };
        const result = item.replace(expr[type], matches => matches[1].toUpperCase());
        return lower ? result : result.charAt(0).toUpperCase() + result.substr(1, result.length - 1);
    }

    /**
     * @deprecated
     * Camelize kebab-case
     * @param item
     * @param lower
     * @returns {string}
     */
    static kebabToCamel(item: string, lower = false): string {
        return StringHelperService.toCamelCase(item, lower, 'kebab');
    }

    /**
     * @deprecated
     * преобразуем строку с пробелами в CamelCase
     * @param item
     * @param lower
     */
    static spacesToCamel(item: string, lower = false): string {
        return StringHelperService.toCamelCase(item, lower, 'space');
    }

    /**
     * Kebab CamelCase
     * @param item
     * @returns {string}
     */
    static camelToKebab(item: string): string {
        if (!item) {
            return 'undefined';
        }
        item = item.charAt(0).toLowerCase() + item.substr(1, item.length - 1);
        return item.replace(/([A-Z]+)/g, matches => '-' + matches.toLowerCase());
    }

    static cleanNonAlphabethical(item: string): string {
        return item.replace(/[^A-Za-z]/gi, '');
    }

    /**
     * Возвращает последнюю секцию пути, разделённого точками
     * @param dotPath
     */
    static parseDotPathLastSection(dotPath: string): string {
        return dotPath && dotPath.indexOf('.') !== -1 ? dotPath.split('.').pop() : dotPath;
    }

    /**
     * Возвращает первую секцию пути, разделённого точками
     * @param dotPath
     */
    static parseDotPathFirstSection(dotPath: string): string {
        return dotPath && dotPath.indexOf('.') !== -1 ? dotPath.split('.')[0] : dotPath;
    }

    /**
     * Возвращает ФИО человека
     * @param human
     */
    static humanFullName(human: IHuman): string {
        if (human.fullName) {
            return human.fullName;
        }
        if (human.secondName) {
            human.lastName = human.secondName;
        }
        if (human.surname) {
            human.lastName = human.surname;
        }
        if (human.name) {
            human.firstName = human.name;
        }
        const result = [human.lastName, human.firstName];
        if (human.patronymic) {
            result.push(human.patronymic);
        }
        return result.join(' ');
    }

    /**
     * Вход: "/documents/primary-data/bank-accounts"
     * Выход: "BankAccounts"
     */
    static routeUrlToResolutionGroup(url: string): string {
        return this.toCamelCase(url.substr(url.lastIndexOf('/') + 1), false, 'kebab');
    }
}
