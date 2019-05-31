import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IadPresentation, PROJECTION_TYPE, ProjectionsHelper } from 'iad-interface-admin';
import { IadFormProjectionInterface } from 'iad-interface-admin/form';
import { Subject, Subscription } from 'rxjs';
import { IadDataOperationsService } from '../services/iad-data-operations.service';
import { IadRouterHistoryService } from '../services/iad-router-history.service';

@Component({
    selector: 'iad-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    projection: IadFormProjectionInterface;

    presentationCode: string;

    postDataUrl: any;

    rawFormData: any;

    formProjectionSubject: Subject<{ [param: string]: any }> = new Subject();

    routerSubscription: Subscription;

    serverError: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public iadDataOperationsService: IadDataOperationsService,
        public iadRouterHistoryService: IadRouterHistoryService) {}

    ngOnInit() {
        this.routerSubscription = this.route.data.subscribe(data => {
            const presentation: IadPresentation = data.presentation;
            this.presentationCode = data.presentation.code;
            this.postDataUrl = data.postDataUrl;
            this.rawFormData = data.rawFormData;
            // Actually we have only one list projection to show and it's name is 'main';
            // And we don't need projectionCode for this case
            this.projection = <IadFormProjectionInterface>ProjectionsHelper
                .filterFormProjections(presentation, PROJECTION_TYPE.FORM)
                .find(_projection => _projection.code === data.projectionCode);
        });
    }

    onFormSubmit(value: any) {
        this.iadDataOperationsService.saveData(this.postDataUrl, value).subscribe(
            (response: any) => {
                this.router.navigateByUrl(this.iadRouterHistoryService.previousUrl);
            },
            (err: any) => {
                this.serverError = err;
            });
    }

    /**
     * при отказе от заполнения формы просто редиректим к списку
     */
    onFormCancel() {
        this.router.navigateByUrl(this.iadRouterHistoryService.previousUrl);
    }

}
