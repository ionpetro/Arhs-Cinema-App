import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { finalize, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;

    if (req.url.startsWith(environment.config.omdbApi.url)) {
      // not log omdb api
      return next.handle(req);
    }

    // extend server response observable with logging
    return next.handle(req).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        // Operation failed; error is an HttpErrorResponse
        (error) => (ok = 'failed')
      ),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
        console.log(msg);
      })
    );
  }
}
