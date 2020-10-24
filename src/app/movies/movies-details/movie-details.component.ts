import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
@Component({
  selector: 'app-movies-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  moviesForm: FormGroup;
  submitted: boolean = false;
  error: string;
  id: string;
  isEditMode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get f() {
    return this.moviesForm.controls;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = Boolean(this.id);

    this.moviesForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateReleased: ['', Validators.required],
    });

    if (this.isEditMode) {
      this.moviesService
        .getMovieById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.f.title.setValue(x.title);
          this.f.description.setValue(x.description);
          this.f.dateReleased.setValue(x.dateReleased);
        });
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.moviesForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.moviesService
        .updateMovie(this.moviesForm.value, this.id)
        .pipe(first())
        .subscribe(
          (data) => {
            this.router.navigate(['movies']);
          },
          (error) => {
            this.error = error.error.message;
          }
        );
    } else {
      this.moviesService
        .addMovie(this.moviesForm.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this.router.navigate(['movies']);
          },
          (error) => {
            this.error = error.error.message;
          }
        );
    }
  }
}
