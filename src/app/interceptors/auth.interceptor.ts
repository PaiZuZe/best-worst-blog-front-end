import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const jwtToken = window.localStorage.getItem("jwtToken");
    let authReq = request;
    if (jwtToken) {
      authReq = request.clone({setHeaders: {Authorization: "Bearer: " + jwtToken}});
    }
    return next.handle(authReq);
  }
}
