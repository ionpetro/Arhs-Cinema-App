import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import { Movie } from '../models/movie';
import { fail } from 'assert';

fdescribe('MoviesService', () => {
  let service: MoviesService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [MoviesService],
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MoviesService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('#getMovies', () => {
    let expectedMovies: Movie[];

    beforeEach(() => {
      service = TestBed.inject(MoviesService);
      expectedMovies = [
        {
          title: 'The Avengers',
          description: 'fa',
          dateReleased: '2020-10-21',
          id: 'kgzYBncZvU',
        },
        {
          title: 'Titanic',
          description: 'beast',
          dateReleased: '2017-11-29',
          id: 'j7liDZZW0B',
        },
        {
          title: 'Two and a half men',
          description: 'serie',
          dateReleased: '2019-09-27',
          id: 'uE-Nd0MUjc',
        },
      ];
    });

    it('should return expected movies', () => {
      service.getMovies().subscribe((movies) => {
        expect(movies).toEqual(expectedMovies, 'should return expected movies'),
          fail;
      });

      // MovieService should have made one request to GET movies from expected URL
      const req = httpTestingController.expectOne(service.moviesUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(expectedMovies);
    });
  });

  describe('#addMovies', () => {
    beforeEach(() => {
      service = TestBed.inject(MoviesService);
    });
    it('should add a movie', () => {
      const movie: Movie = {
        id: 'string_id',
        title: 'MyMovie',
        description: 'test',
        dateReleased: '16-07-2010',
      };
      service
        .addMovie(movie)
        .subscribe(
          (movies) =>
            expect(movies).toEqual(movie, 'should return expected movies'),
          fail
        );

      // MovieService should have made one request to GET movies from expected URL
      const req = httpTestingController.expectOne(service.moviesUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(movie);

      // Respond with the mock heroes
      req.flush(movie);
    });
  });

  describe('#keepChangesMethod', () => {
    beforeEach(() => {
      service = TestBed.inject(MoviesService);
    });

    it('should return only movie description', () => {
      let changes;
      const movie: Movie = {
        id: 'string',
        title: 'MyMovie',
        description: 'MyDescription',
        dateReleased: '12-09-2010',
      };

      const updatedMovie: Movie = {
        id: 'string',
        title: 'MyMovieUpdated',
        description: 'MyDescription',
        dateReleased: '12-09-2010',
      };

      const movieChanges = {
        title: 'MyMovieUpdated',
      };

      changes = service.keepChanges(movie, updatedMovie);
      expect(changes).toEqual(movieChanges, 'should return only description'),
        fail;
    });

    it('should return all attributes', () => {
      let changes;
      const movie: Movie = {
        id: 'string',
        title: 'MyMovie',
        description: 'MyDescription',
        dateReleased: '12-09-2010',
      };

      const updatedMovie: Movie = {
        id: 'string',
        title: 'MyMovieUpdated',
        description: 'MyDescriptionUpdated',
        dateReleased: '11-10-2012',
      };

      const movieChanges = {
        title: 'MyMovieUpdated',
        description: 'MyDescriptionUpdated',
        dateReleased: '11-10-2012',
      };

      changes = service.keepChanges(movie, updatedMovie);
      expect(changes).toEqual(movieChanges, 'should return only description'),
        fail;
    });
  });

  describe('#updateMovie', () => {
    beforeEach(() => {
      service = TestBed.inject(MoviesService);
    });

    it('should update a movie', () => {
      const movie: Movie = {
        id: 'string',
        title: 'MyMovie',
        description: 'MyDescription',
        dateReleased: '12-09-2010',
      };

      const updatedMovie: Movie = {
        id: 'string',
        title: 'MyMovieUpdated',
        description: 'MyDescription',
        dateReleased: '12-09-2010',
      };

      service.updateMovie(movie, updatedMovie, movie.id).subscribe((data) => {
        expect(data).toEqual(updatedMovie, 'should return updated movie'), fail;
      });

      const req = httpTestingController.expectOne(
        `${service.moviesUrl}/${movie.id}`
      );
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updatedMovie);

      // Respond with the mock movie
      req.flush(updatedMovie);
    });
  });

  describe('#deleteMovie', () => {
    beforeEach(() => {
      service = TestBed.inject(MoviesService);
    });

    it('should delete a movie', () => {
      const movieId: string = 'string';

      const deletedMovie: Movie = {
        id: 'string',
        title: 'MyMovie',
        description: 'MyDescription',
        dateReleased: '12-09-2010',
      };

      service.deleteMovie(movieId).subscribe((data) => {
        expect(data).toEqual(deletedMovie, 'should return deleted movie'), fail;
      });

      const req = httpTestingController.expectOne(
        `${service.moviesUrl}/${movieId}`
      );

      expect(req.request.method).toEqual('DELETE');

      req.flush(deletedMovie);
    });
  });
});
