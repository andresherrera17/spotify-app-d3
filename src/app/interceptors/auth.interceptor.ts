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
    const tokenSpotify: string | null = sessionStorage.getItem('tokenSpotify');

    let requestApi = request;
    if(tokenSpotify){
      request = requestApi.clone({
        setHeaders: {
          authorization: `Bearer ${tokenSpotify}`
        }
      })
    }


    return next.handle(request);
  }
}
