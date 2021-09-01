import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Author } from '../model/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private  authorsUrl: string = 'http://localhost:8080/api/author';
  private  httpOptions = {headers: new HttpHeaders({
    "Content-type": `application/json`
  })};

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.authorsUrl}`);
  }

  getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.authorsUrl}/${id}`);
  }

  post(author: Author): Observable<Author> {
    return this.http.post<Author>(this.authorsUrl, author, this.httpOptions);
  }

  put(id: number, author: Author): Observable<Author> {
    return this.http.put<Author>(`${this.authorsUrl}/${id}`, author, this.httpOptions)
  }

  deleteById(id: number): Observable<unknown> {
    return this.http.delete(`${this.authorsUrl}/${id}`);
  }

  donate(id: number): Observable<any> {
    const params = new HttpParams({fromString: "donation_amount=10"});
    return this.http.put(`${this.authorsUrl}/${id}/donate`, null, {params});
  }
}
