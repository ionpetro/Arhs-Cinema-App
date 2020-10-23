import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
  user: Observable<User>;
  currentUser: User;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.user = this.userService.getUser();
    this.user.subscribe((user) => (this.currentUser = user));
  }

  deleteUser() {
    this.userService.deleteUser().subscribe();
  }

  ngOnInit(): void {}
}
