import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/auth.service';
import { Location } from '@angular/common';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {

  }


  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.router.navigate(['/login']);
      }, (error) => {
        console.log('Logout error', error);
      });
  }
}
