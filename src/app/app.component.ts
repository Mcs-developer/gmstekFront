import { Component } from '@angular/core';
import { AuthenticationService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'GAPTestFront';
  navbarCollapsed = true;

  constructor(private authService: AuthenticationService,
              private router: Router) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get getUserName() {
    return this.authService.getUserName;
  }

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
