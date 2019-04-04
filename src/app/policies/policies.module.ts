import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { PoliciesRoutingModule } from './policies-routing.module';
import { PolicyListComponent } from './policy-list/policy-list.component';
import { PolicyEditComponent } from './policy-edit/policy-edit.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    PoliciesRoutingModule
  ],
  declarations: [PolicyListComponent, PolicyEditComponent]
})
export class PoliciesModule { }
