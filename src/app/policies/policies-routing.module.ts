import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyListComponent } from './policy-list/policy-list.component';
import { PolicyEditComponent } from './policy-edit/policy-edit.component';

const routes: Routes = [
  { path: '' , component: PolicyListComponent },
  { path: ':id/edit', component: PolicyEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliciesRoutingModule { }
