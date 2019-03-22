/**
 * thanks to https://blog.strongbrew.io/safe-image-requests-in-angular/
 */

import { Component, ElementRef, Input, OnChanges, SimpleChanges, Renderer2, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'jhi-secured-image',
    template: `<jhi-image
            [src]="dataUrl$|async"
            [defaultSrc]="defaultSrc"
            [setDefaultAbsoluteSrc]="setDefaultAbsoluteSrc"
            [imageStyle]="imageStyle"
            [title]="title"
            [alt]="alt"></jhi-image>`
})
export class SecuredImageComponent implements OnChanges, OnInit {
    // This code block just creates an rxjs stream from the src
    // this makes sure that we can handle source changes
    // or even when the component gets destroyed
    // So basically turn src into src$
    @Input() src: string;

    /**
     * Ресурс картинки по умолчанию
     */
    @Input() defaultSrc: string;

    @Input() setDefaultAbsoluteSrc: string;

    /**
     * Подпись на случай если картиика не загружено
     */
    @Input() alt = '';

    /**
     * Подпись картинки при наведении курсора
     */
    @Input() title = '';

    /**
     * Стили картинки
     */
    @Input() imageStyle: any = {};

    private src$ = new BehaviorSubject(this.src);

    // this stream will contain the actual url that our img tag will load
    // everytime the src changes, the previous call would be canceled and the
    // new resource would be loaded
    dataUrl$ = this.src$.pipe(switchMap(url => this.loadImage(url)));

    // we need HttpClient to load the image
    constructor(private httpClient: HttpClient, private domSanitizer: DomSanitizer, private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('src' in changes && changes['src'].currentValue) {
            this.src$.next(changes['src'].currentValue);
        }
    }

    /**
     *  load the image as a blob
     *  For sanitizing url of image loaded through AJAX we need the DomSanitizer that angular provides us.
     *  This is a security mechanism to protect the app from XSS-attacks. We basically have to tell angular which urls to trust.
     * @param url
     */
    private loadImage(url: string): Observable<any> {
        return url
            ? this.httpClient
                  .get(url, { responseType: 'blob' })
                  .pipe(map(e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e))))
            : of(null);
    }
}
