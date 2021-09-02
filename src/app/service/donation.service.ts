import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Donation } from '../model/donation';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private  donationsUrl: string = 'http://localhost:8080/api/donate';
  private  httpOptions = {headers: new HttpHeaders({
    "Content-type": `application/json`
  })};

  constructor(private http: HttpClient) { }

  public post(donation: Donation): Observable<unknown> {
    return this.http.post<unknown>(`${this.donationsUrl}`, donation, this.httpOptions);
  }
}
