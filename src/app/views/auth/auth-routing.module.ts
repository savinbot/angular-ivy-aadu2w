import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import {AuthGuard} from '../../shared/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Login'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
