import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';


@NgModule({
  imports: [
    RouterModule.forRoot([
    //   { path: 'welcome', component: WelcomeComponent },
      {
        path: 'policies',
        canActivate: [ AuthGuard ],
        // data: { preload: true },
        loadChildren: './policies/policies.module#PoliciesModule'
      },
      { path: '', redirectTo: 'policies', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
