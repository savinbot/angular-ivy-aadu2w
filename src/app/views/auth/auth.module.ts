import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from '../../shared/auth.guard';
import {UserService} from '../../shared/user.service';
import {DashboardResolver} from '../dashboard/dashboard.resolver';
import {AuthService} from '../../shared/auth.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment.prod';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  declarations: [ LoginComponent],
  providers: [AuthGuard, UserService, DashboardResolver, AuthService]
})
export class AuthModule { }
