import {
    Component,
    ElementRef,
    Renderer2,
    ViewChild,
    Input,
    OnChanges,
    SimpleChanges,
    OnDestroy,
    Injectable,
    OnInit,
    Output,
    EventEmitter,
    HostListener,
    NgZone
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ToolbarDropdownEventsService {
    $shown: Subject<{ id: string }> = new Subject<{ id: string }>();

    broadcastShown(id: string): void {
        this.$shown.next({ id });
    }

    subscribeShown(id: string, callback: any): Subscription {
        const subscriber: Subscription = this.$shown
            .asObservable()
            .pipe(
                filter(event => {
                    return event.id !== id;
                })
            )
            .subscribe(callback);
        return subscriber;
    }
}

@Component({
    selector: 'iad-table-dropdown',
    template: `
        <div #dropdownWrapper class="iad-dropdown-wrapper">
            <div class="iad-dropdown">
                <ng-content></ng-content>
            </div>
        </div>`
})
export class ToolbarDropdownComponent implements OnChanges, OnInit, OnDestroy {
    @Input() toggle: Subject<boolean>;

    @Input() code: string;

    @Output() hidden: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('dropdownWrapper') dropdownWrapper: ElementRef;

    get shown(): boolean {
        return this._shown;
    }

    private _shown: boolean;

    private subscription: Subscription;

    private id: string;

    private clickListener: any;

    constructor(
        private renderer: Renderer2,
        private el: ElementRef,
        private eventsService: ToolbarDropdownEventsService,
        private router: Router,
        public zone: NgZone
    ) {}

    ngOnInit(): void {
        this.id = this.guidGenerator();
        this.eventsService.subscribeShown(this.id, () => {
            this.hide();
        });
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.hide();
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('toggle' in changes) {
            this.subscription = this.toggle.subscribe(this.doToggle.call(this));
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    doToggle(shown: boolean) {
        if (shown) {
            this.show();
        } else {
            this.hide();
        }
    }

    show() {
        this._shown = true;
        this.renderer.addClass(this.dropdownWrapper.nativeElement, 'show');
        this.eventsService.broadcastShown(this.id);
        this.bindClickEventListener();
    }

    hide() {
        this._shown = false;
        this.renderer.removeClass(this.dropdownWrapper.nativeElement, 'show');
        this.hidden.emit(this.code);
        this.unbindEventListener();
    }

    onClick(event) {
        if(!this.el.nativeElement.contains(event.target)) {
            this.hide();
        }
    }

    private bindClickEventListener() {
        this.zone.runOutsideAngular(() => {
            this.clickListener = this.onClick.bind(this);
            window.addEventListener('mousedown', this.clickListener);
        });
    }

    private unbindEventListener() {
        if(this.clickListener) {
            window.removeEventListener('mousedown', this.clickListener);
        }
    }

    private guidGenerator(): string {
        return (
            '_' +
            Math.random()
                .toString(36)
                .substr(2, 9)
        );
    }
}
