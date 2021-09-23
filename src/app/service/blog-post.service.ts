import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { BlogPost } from '../model/blog-post';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  private blogPostUrl: string = "http://localhost:8080/api/blogPost";
  private  httpOptions = {headers: new HttpHeaders({
    "Content-type": `application/json`
  })};

  constructor(private http: HttpClient) { }

  public getBlogPostsPage(size: number = 5, page: number = 0): Observable<any> {
    return this.http.get<any>(`${this.blogPostUrl}/pages?size=${size}&page=${page}`).pipe(catchError(this.handleError));
  }

  public getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.blogPostUrl}`).pipe(catchError(this.handleError));
  }

  public getBlogPost(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.blogPostUrl}/${id}`).pipe(catchError(this.handleError));
  }

  public post(blogPost: BlogPost): Observable<BlogPost>{
    this.trim(blogPost);
    return this.http.post<BlogPost>(this.blogPostUrl, blogPost, this.httpOptions).pipe(catchError(this.handleError));
  }

  public put(id: number, blogPost: BlogPost): Observable<BlogPost> {
    this.trim(blogPost);
    return this.http.put<BlogPost>(`${this.blogPostUrl}/${id}`, blogPost, this.httpOptions).pipe(catchError(this.handleError));
  }

  public delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.blogPostUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg: String = "I'm not sure what happend."
    if (error.status == 400) {
      errorMsg = "This author already has a post with this title."
    }
    else if (error.status == 403) {
      errorMsg = "You lack the credentials, please authenticate."
    }
    else if (error.status == 404) {
      errorMsg = "No blog post with this id exists."
    }
    else if (error.status == 409) {
      errorMsg = "No author with this id exists."
    }
    window.alert(`${error.status}: ${errorMsg}`);
    return throwError(error);
  }

  private trim(blogPost: BlogPost) {
    blogPost.title = blogPost.title.trim();
    blogPost.textBody = blogPost.textBody.trim();
  }
}
