import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(private authService: AuthService) {
    this.authService.user.subscribe((x) => (this.user = x));
  }

  user: User;

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
