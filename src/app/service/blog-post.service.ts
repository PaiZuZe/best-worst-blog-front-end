import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BlogPost } from '../model/blog-post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  private blogPostUrl: string = "http://localhost:8080/api/blogPost";
  private  httpOptions = {headers: new HttpHeaders({
    "Content-type": `application/json`
  })};

  constructor(private http: HttpClient) { }

  public getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.blogPostUrl}`);
  }

  public getBlogPost(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.blogPostUrl}/${id}`);
  }

  public post(blogPost: BlogPost): Observable<BlogPost>{
    return this.http.post<BlogPost>(this.blogPostUrl, blogPost, this.httpOptions);
  }

  public delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.blogPostUrl}//${id}`);
  }
}
