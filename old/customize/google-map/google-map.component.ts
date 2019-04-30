import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import {} from '@types/googlemaps';
import { GeocodingService } from 'app/shared';

@Component({
    selector: 'jhi-google-map',
    template: `<div class="map-wrapper" #gMapElement [ngStyle]="styles"></div>`
})
export class GoogleMapComponent implements OnInit, AfterViewInit {
    /**
     * Ссылка на элмемент с картой гугля
     */
    @ViewChild('gMapElement') gMapElement: ElementRef;

    /**
     * Данные для карты
     */
    @Input() address = '';

    /**
     * Высота таблицы в px
     */
    @Input() height = 400;

    /**
     * Стили карты
     */
    styles: { [p: string]: string | number };

    /**
     * Экземпляр карты
     */
    private map: any;

    constructor(private geocoding: GeocodingService) {}

    ngOnInit() {
        this.styles = { 'width.%': 100 };
        if (this.height) {
            this.styles['height.px'] = this.height;
        } else {
            this.styles['height.%'] = 100;
        }
    }

    ngAfterViewInit(): void {
        this.initGMap();
    }

    initGMap(): void {
        if (!this.gMapElement) {
            return;
        }
        this.geocoding.codeAddress(this.address).subscribe(data => {
            /**
             * bounds: LatLngBounds;
             * location: LatLng;
             * location_type: GeocoderLocationType;
             * viewport: LatLngBounds;
             */
            const latLng = data[0].geometry.location.toJSON();
            const mapProp = {
                center: new google.maps.LatLng(latLng.lat, latLng.lng),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(this.gMapElement.nativeElement, mapProp);
        });
        this.map = new google.maps.Map(this.gMapElement.nativeElement, {});
    }
}
