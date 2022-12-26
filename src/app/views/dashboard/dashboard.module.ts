import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardResolver} from './dashboard.resolver';
import {UserService} from '../../shared/user.service';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AuthService} from '../../shared/auth.service';

@NgModule({
  imports: [
    DashboardRoutingModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  declarations: [ DashboardComponent ],
  providers: [DashboardResolver, UserService, AuthService]
})
export class DashboardModule { }
