import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
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
  loading: boolean = false;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

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
    this.loading = true;
    this.authService
      .register(
        this.f.firstName.value,
        this.f.lastName.value,
        this.f.username.value,
        this.f.password.value
      )
      .pipe(first())
      .subscribe(
        (data) => {
          //login user
          this.authService
            .login(this.f.username.value, this.f.password.value, true)
            .subscribe((_) => this.router.navigate(['/']));
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
