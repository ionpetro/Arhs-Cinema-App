import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(private userService: UserService) {
    this.userService.user.subscribe((x) => (this.user = x));
  }

  user: User;

  ngOnInit(): void {}

  logout() {
    this.userService.logout();
  }
}
