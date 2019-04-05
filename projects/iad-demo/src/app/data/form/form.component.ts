import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IadPresentation, PROJECTION_TYPE, ProjectionsHelper} from 'iad-interface-admin';
import {Subscription} from 'rxjs';
import {IadFormProjectionInterface} from 'iad-interface-admin';
import {IFormProjectionField} from 'iad-interface-admin';
import {ReferenceProjectionProviderService} from '../services/reference-projection-provider.service';

@Component({
  selector: 'iad-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  fields: IFormProjectionField[];

  projection: IadFormProjectionInterface;

  presentationCode: string;

  postDataUrl: any;

  rawFormData: any;

  routerSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, public projectionService: ReferenceProjectionProviderService) { }

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

        this.fields = this.projection.fields;
      });
  }

}
