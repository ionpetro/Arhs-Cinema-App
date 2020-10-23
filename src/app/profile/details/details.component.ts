import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
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
