import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl: string = "http://localhost:8080/api/login";

  constructor(private http: HttpClient) { }

  public login(): Observable<HttpResponse<any>> {
    window.sessionStorage.removeItem("jwtToken");
    return this.http.post<any>(this.authUrl, {}, { observe: "response" })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg: String = "I'm not sure what happend."
    window.alert(`${error.status}: ${errorMsg}`);
    return throwError(error);
  }
}
