import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { BaseGridComponent } from './base-grid.component';
import { IadPrimengModule, IadSharedModule, IadConfigService, IadModuleConfigInterface } from 'iad-interface-admin/core';
import { SharedModule } from 'primeng/shared';
import { TableHeaderMenuComponent } from '../table-header-menu/table-header-menu.component';
import { TableSortIconDirective } from '../table-sort-icon/table-sort-icon.directive';
import { TableColumnFilterComponent } from '../table-column-filter/table-column-filter.component';
import { TableColumnSizeDirective } from '../table-column-size/table-column-size.directive';
import { BaseGridTdHostDirective } from './base-grid-td-host.directive';
import { DefaultColumnComponent } from '../column-components/default-column.component';
import { ActionsColumnComponent } from '../column-components/actions-column.component';
import { ChipsColumnComponent } from '../column-components/chips-column.component';
import { FilterBuilderModule, FILTER_BUILDER, FilterBuilderService } from 'iad-interface-admin/filter';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GridComponent', () => {
    let component: BaseGridComponent;
    let fixture: ComponentFixture<BaseGridComponent>;
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let configService: IadConfigService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                IadPrimengModule,
                IadSharedModule,
                SharedModule,
                FilterBuilderModule,
                IadPrimengModule,
                FilterBuilderModule
            ],
            declarations: [
                TableHeaderMenuComponent,
                TableSortIconDirective,
                TableColumnFilterComponent,
                BaseGridComponent,
                TableColumnSizeDirective,
                BaseGridTdHostDirective,
                DefaultColumnComponent,
                ActionsColumnComponent,
                ChipsColumnComponent
            ],
            providers: [
                {
                    provide: IadConfigService,
                    useValue: new IadConfigService(<IadModuleConfigInterface>{
                        defaultI18nLang: 'en',
                        i18nEnabled: true,
                        filterBuilderProvider: { provide: FILTER_BUILDER, useClass: FilterBuilderService }
                    })
                },
                { provide: FILTER_BUILDER, useClass: FilterBuilderService }
            ]
        })
            .compileComponents();
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        configService = injector.get(IadConfigService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BaseGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
