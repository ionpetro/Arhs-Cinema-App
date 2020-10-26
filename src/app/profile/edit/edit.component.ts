import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { checkPasswords } from 'src/app/shared/checkPasswords';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  updateProfile: FormGroup;
  user: User;
  submitted: boolean = false;
  loading: boolean = false;
  error: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.user = this.authService.userValue;
  }

  ngOnInit(): void {
    this.updateProfile = this.formBuilder.group(
      {
        firstname: [this.user.firstname],
        lastname: [this.user.lastname],
        username: [this.user.username],
        password: [''],
        confirmPassword: [''],
      },
      {
        validator: checkPasswords('password', 'confirmPassword'),
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.updateProfile.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateProfile.invalid) {
      return;
    }

    this.loading = true;
    this.userService.updateUser(this.updateProfile.value).subscribe(
      (data) => {
        this.router.navigate(['/profile']);
      },
      (error) => {
        this.error = error;
      }
    );
  }
}
