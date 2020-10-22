import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { checkPasswords } from 'src/app/shared/checkPasswords';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  submitted = false;
  error: string;
  registerForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // redirect to home if already logged in
    if (this.userService.userValue) {
      this.router.navigate(['/']);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: checkPasswords('password', 'confirmPassword'),
      }
    );
  }

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
