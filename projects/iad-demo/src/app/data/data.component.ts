import { Component, OnInit } from '@angular/core';
import {IadEventManager} from 'iad-interface-admin/core';

@Component({
  selector: 'iad-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor(private eventManager: IadEventManager) { }

  ngOnInit() {
    this.eventManager.subscribe('actionsButtonClick', event => {
      alert('Actions button clicked with id: ' + event.content['id']);
    });
  }

}
