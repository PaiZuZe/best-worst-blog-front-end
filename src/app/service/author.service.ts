import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { Author } from '../model/author';
import { BlogPost } from '../model/blog-post';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private  authorsUrl: string = 'http://localhost:8080/api/author';
  private  httpOptions = {headers: new HttpHeaders({
    "Content-type": `application/json`
  })};

  constructor(private http: HttpClient) { }

  getAuthorsPage(size: number = 5, page: number = 0): Observable<any> {
    return this.http.get<any>(`${this.authorsUrl}/pages?size=${size}&page=${page}`).pipe(catchError(this.handleError));
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.authorsUrl}`).pipe(catchError(this.handleError));
  }

  getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.authorsUrl}/${id}`).pipe(catchError(this.handleError));
  }

  getAuthorBlogPosts(id: number): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.authorsUrl}/${id}/blogPosts`).pipe(catchError(this.handleError));
  }

  post(author: Author): Observable<Author> {
    this.trim(author);
    return this.http.post<Author>(this.authorsUrl, author, this.httpOptions).pipe(catchError(this.handleError));
  }

  put(id: number, author: Author): Observable<Author> {
    this.trim(author);
    return this.http.put<Author>(`${this.authorsUrl}/${id}`, author, this.httpOptions).pipe(catchError(this.handleError));
  }

  deleteById(id: number): Observable<unknown> {
    return this.http.delete(`${this.authorsUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg: String = "I'm not sure what happend."
    if (error.status == 400) {
      errorMsg = "A author with this name already exists."
    }
    else if (error.status == 403) {
      errorMsg = "You lack the credentials, please authenticate."
    }
    else if (error.status == 404) {
      errorMsg = "No author with this id exists."
    }
    window.alert(`${error.status}: ${errorMsg}`);
    return throwError(error);
  }

  private trim(author: Author) {
    author.firstName = author.firstName.trim();
    author.lastName = author.lastName.trim();

  }
}
