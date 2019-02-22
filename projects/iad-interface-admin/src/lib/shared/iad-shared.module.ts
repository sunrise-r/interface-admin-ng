import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MomentPipe} from './pipes/moment.pipe';
import {BooleanPipe} from './pipes/boolean.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MomentPipe, BooleanPipe],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MomentPipe,
    BooleanPipe
  ]
})
export class IadSharedModule { }
