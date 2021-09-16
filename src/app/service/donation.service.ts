import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Donation } from '../model/donation';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private  donationsUrl: string = 'http://localhost:8080/api/donate';
  private  httpOptions = {headers: new HttpHeaders({
    "Content-type": `application/json`
  })};

  constructor(private http: HttpClient) { }

  public post(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(`${this.donationsUrl}`, donation, this.httpOptions).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg: String = "I'm not sure what happend."
    if (error.status == 403) {
      errorMsg = "You lack the credentials, please authenticate."
    }
    else if (error.status == 404) {
      errorMsg = "No author with this id exists."
    }
    window.alert(`${error.status}: ${errorMsg}`);
    return throwError(error);
  }
}
