import { Component, ElementRef, Renderer2, ChangeDetectorRef, Input, OnInit, forwardRef, HostBinding, OnDestroy } from '@angular/core';
import { style, trigger, transition, state, animate } from '@angular/animations';
import { Calendar, DomHandler, LocaleSettings } from 'primeng/primeng';
import { TranslateService } from '@ngx-translate/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

type DefaultsLoopCallback = (item: any, key: string) => void;

export const IAD_CALENDAR_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CalendarComponent),
    multi: true
};

@Component({
    selector: 'iad-calendar',
    templateUrl: './calendar.component.html',
    animations: [
        trigger('overlayAnimation', [
            state(
                'visible',
                style({
                    transform: 'translateY(0)',
                    opacity: 1
                })
            ),
            state(
                'visibleTouchUI',
                style({
                    transform: 'translate(-50%,-50%)',
                    opacity: 1
                })
            ),
            transition('void => visible', [style({ transform: 'translateY(5%)', opacity: 0 }), animate('{{showTransitionParams}}')]),
            transition('visible => void', [
                animate(
                    '{{hideTransitionParams}}',
                    style({
                        opacity: 0,
                        transform: 'translateY(5%)'
                    })
                )
            ]),
            transition('void => visibleTouchUI', [
                style({ opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)' }),
                animate('{{showTransitionParams}}')
            ]),
            transition('visibleTouchUI => void', [
                animate(
                    '{{hideTransitionParams}}',
                    style({
                        opacity: 0,
                        transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
                    })
                )
            ])
        ])
    ],
    providers: [IAD_CALENDAR_VALUE_ACCESSOR]
})
export class CalendarComponent extends Calendar implements OnInit, OnDestroy, ControlValueAccessor {
    /**
     * First Day of Week for calendar
     */
    @Input() firstDayOfWeek = 1;

    /**
     * Префикс для переводов календаря
     */
    @Input() prefix = 'calendar';

    /**
     * Префикс для переводов календаря
     */
    @Input() enableTranslations: boolean;

    /**
     * Обязательные для анимации поля. Открытие дропдауна
     */
    @Input() showTransitionOptions = '225ms ease-out';

    /**
     * Обязательные для анимации поля. Скрытие дропдауна
     */
    @Input() hideTransitionOptions = '195ms ease-in';

    @HostBinding('class.ui-inputwrapper-filled') filled: boolean;

    @HostBinding('class.ui-inputwrapper-focus') focus: boolean;

    /**
     * Флаг означающий, что локаль обновлена
     */
    localeInitialized: boolean;

    /**
     * Сгенерированные ключи переводов
     */
    private _localeTranslationKeys = [];

    get locale() {
        return this._locale;
    }

    @Input()
    set locale(newLocale: LocaleSettings) {
        this._locale = newLocale;
        this.localeInitialized = true;
        if (this.view === 'date') {
            this.createWeekDays();
            this.createMonths(this.currentMonth, this.currentYear);
        } else if (this.view === 'month') {
            this.createMonthPickerValues();
        }
    }

    constructor(
        public el: ElementRef,
        public renderer: Renderer2,
        public cd: ChangeDetectorRef,
        private translateService: TranslateService
    ) {
        super(el, renderer, cd);
    }

    ngOnInit() {
        const date = this.defaultDate || new Date();
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();

        if (this.enableTranslations && !this.localeInitialized) {
            this._localeTranslationKeys = this.collectLocaleTranslationKeys();
            this.translateService.get(this._localeTranslationKeys).subscribe(translation => {
                this._locale = this.populateLocale(translation);
                this.initCalendar(date);
            });
        } else {
            this.initCalendar(date);
        }
    }

    initCalendar(date) {
        this.localeInitialized = true;
        if (this.yearNavigator && this.yearRange) {
            const years = this.yearRange.split(':');
            const yearStart = parseInt(years[0], 10);
            const yearEnd = parseInt(years[1], 10);

            this.populateYearOptions(yearStart, yearEnd);
        }

        if (this.view === 'date') {
            this.createWeekDays();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
            this.ticksTo1970 =
                ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000;
        } else if (this.view === 'month') {
            this.createMonthPickerValues();
        }
    }

    /**
     * Заполняет модель LocaleSettings
     * @param translation
     */
    populateLocale(translation): LocaleSettings {
        const locale = {};
        this.defaultsLoop((item: any, key: string) => {
            if (Array.isArray(this._locale[key])) {
                locale[key] = this._locale[key].map(val => translation[[this.prefix, key, val].join('.')]);
            } else if (typeof this._locale[key] === 'string') {
                locale[key] = translation[[this.prefix, this._locale[key]].join('.')];
            } else if (key === 'firstDayOfWeek') {
                locale[key] = this.firstDayOfWeek;
            }
        });
        return <LocaleSettings>locale;
    }

    /**
     * Набирает ключи для перевода
     */
    collectLocaleTranslationKeys() {
        let translationKeys = [];
        this.defaultsLoop((item: any, key: string) => {
            if (Array.isArray(this._locale[key])) {
                translationKeys = translationKeys.concat(this._locale[key].map(val => [this.prefix, key, val].join('.')));
            } else if (typeof this._locale[key] === 'string') {
                translationKeys.push([this.prefix, this._locale[key]].join('.'));
            }
        });
        return translationKeys;
    }

    /**
     * loop vy default properties
     * @param callback
     */
    private defaultsLoop(callback: DefaultsLoopCallback) {
        for (const key in this._locale) {
            if (this._locale.hasOwnProperty(key)) {
                callback(this._locale[key], key);
            }
        }
    }
}
