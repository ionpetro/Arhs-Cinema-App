import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  submitted = false;
  error: string;
  registerForm = new FormGroup({
    firstName: new FormControl('', {
      validators: Validators.required,
    }),
    lastName: new FormControl('', {
      validators: Validators.required,
    }),
    username: new FormControl('', {
      validators: Validators.required,
    }),
    password: new FormControl('', {
      validators: Validators.required,
    }),
  });

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  constructor(private userService: UserService, private router: Router) {
    // if (this.userService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userService
      .register(
        this.f.firstName.value,
        this.f.lastName.value,
        this.f.username.value,
        this.f.password.value
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          this.error = error.error.message;
        }
      );
  }
}
