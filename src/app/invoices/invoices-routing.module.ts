import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceNewComponent } from './invoice-new/invoice-new.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';

const routes: Routes = [
  { path: '' , component: InvoiceListComponent },
  { path: 'new', component: InvoiceNewComponent },
  { path: ':id/edit', component: InvoiceEditComponent },
  { path: ':id/view', component: InvoiceViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
