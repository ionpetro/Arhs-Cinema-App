import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(private router: Router, private authService: AuthService) {
    // redirect to home if already logged in
    console.log(this.authService.userValue);
    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }
}
