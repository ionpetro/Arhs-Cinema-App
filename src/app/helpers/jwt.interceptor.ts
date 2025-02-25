import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.authService.userValue;
    const token = this.authService.token;
    const isLoggedIn = user && token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    // return if user is not logged in or the request is not to the api url
    if (!isLoggedIn || !isApiUrl) {
      return next.handle(request);
    }

    // add token to request header if user is logged in
    const req1 = request.clone({
      headers: request.headers.set('token', `${token}`),
    });

    return next.handle(req1);
  }
}
