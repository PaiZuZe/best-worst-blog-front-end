import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

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
  size: number = 5;
  length: number = 100;
  page: number = 0;

  constructor(private blogPostService: BlogPostService, private authorService: AuthorService) { }

  ngOnInit(): void {
    this.getBlogPostsPage();
    this.getAuthorNames();
  }

  getBlogPostsPage(): void {
    this.blogPostService.getBlogPostsPage(this.size, this.page)
      .subscribe(page => {
        this.blogPosts = page.content;
        this.length = page.totalElements;
      });
  }

  getAuthorNames() {
    this.authorService.getAuthors()
      .subscribe(authors => {
        authors.forEach(author => this.authorNames[author.id] = author.firstName + " " + author.lastName);
      });
  }

  handleEvent(event: PageEvent) {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.getBlogPostsPage();
  }

}
