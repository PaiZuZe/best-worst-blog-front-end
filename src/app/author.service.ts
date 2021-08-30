import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Author } from './author';

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
    return this.http.get<Author>(`${this.authorsUrl}\\${id}`);
  }

  post(author: Author): Observable<Author> {
    return this.http.post<Author>(this.authorsUrl, author, this.httpOptions);
  }

  put(author: Author): Observable<Author> {
    return this.http.put<Author>(`${this.authorsUrl}\\${author.id}`, author, this.httpOptions)
  }

  deleteById(id: number): Observable<unknown> {
    return this.http.delete(`${this.authorsUrl}\\${id}`);
  }
}
