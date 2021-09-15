import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl: string = "http://localhost:8080/api/login";

  constructor(private http: HttpClient) { }

  public login(): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.authUrl, {}, { observe: "response" });
  }
}
