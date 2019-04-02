import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IadPresentation, PROJECTION_TYPE, ProjectionsHelper} from 'iad-interface-admin';
import {Subscription} from 'rxjs';
import {IadFormProjectionInterface} from 'iad-interface-admin';
import {IFormProjectionField} from 'iad-interface-admin';

@Component({
  selector: 'iad-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  fields: IFormProjectionField[];

  projection: IadFormProjectionInterface;

  rawFormData: any[];

  presentationCode: string;

  routerSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
      this.routerSubscription = this.route.data.subscribe(data => {
        const presentation: IadPresentation = data.presentation;
        this.presentationCode = data.presentation.code;
        // Actually we have only one list projection to show and it's name is 'main';
        // And we don't need projectionCode for this case
        this.projection = <IadFormProjectionInterface>ProjectionsHelper
          .filterFormProjections(presentation, PROJECTION_TYPE.FORM)
          .find(_projection => _projection.code === 'BankAccount');

        this.fields = this.projection.fields;
      });
  }

}
