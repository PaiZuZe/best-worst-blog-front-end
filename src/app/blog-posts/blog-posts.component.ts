import { Component, OnInit } from '@angular/core';

import { BlogPost } from '../model/blog-post';
import { AuthorService } from '../service/author.service';
import { BlogPostService } from '../service/blog-post.service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  authorNames: {[id: number]: String} = {};

  constructor(private blogPostService: BlogPostService, private authorService: AuthorService) { }

  ngOnInit(): void {
    this.getBlogPosts();
    this.getAuthorNames();
  }

  getBlogPosts(): void {
    this.blogPostService.getBlogPosts()
      .subscribe(blogPosts => this.blogPosts = blogPosts);
  }

  getAuthorNames() {
    this.authorService.getAuthors()
      .subscribe(authors => {
        authors.forEach(author => this.authorNames[author.id] = author.firstName + " " + author.lastName);
      });
  }

}
