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
    return this.http.post<Author>(this.authorsUrl, author, this.httpOptions).pipe(catchError(this.handleError));
  }

  put(id: number, author: Author): Observable<Author> {
    return this.http.put<Author>(`${this.authorsUrl}/${id}`, author, this.httpOptions).pipe(catchError(this.handleError));
  }

  deleteById(id: number): Observable<unknown> {
    return this.http.delete(`${this.authorsUrl}/${id}`).pipe(catchError(this.handleError));
  }

  donate(id: number): Observable<any> {
    const params = new HttpParams({fromString: "donation_amount=10"});
    return this.http.put(`${this.authorsUrl}/${id}/donate`, null, {params}).pipe(catchError(this.handleError));
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
}
