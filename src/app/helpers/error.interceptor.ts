import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // auto logout if user in Unauthorized
        if (error.status === 401) {
          this.authService.logout();
        }

        let errorMsg = '';
        // console.log(error);
        if (error.status === 0) {
          errorMsg = 'Server not reachable';
        } else if (
          error.error.message === 'Bad Request' &&
          error.url.endsWith('/users/signin')
        ) {
          errorMsg = `Invalid username/password supplied`;
        } else {
          errorMsg = `${error.error.message}`;
        }
        return throwError(errorMsg);
      })
    );
  }
}
