import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { MatStepperModule } from '@angular/material/stepper';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceNewComponent } from './invoice-new/invoice-new.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';

@NgModule({
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
  ],
  declarations: [InvoiceListComponent, InvoiceEditComponent, InvoiceNewComponent, InvoiceViewComponent]
})
export class InvoicesModule { }
