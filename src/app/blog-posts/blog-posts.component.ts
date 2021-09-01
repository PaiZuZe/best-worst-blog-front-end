import { Component, OnInit } from '@angular/core';

import { BlogPost } from '../model/blog-post';
import { BlogPostService } from '../service/blog-post.service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent implements OnInit {
  blogPosts: BlogPost[] = [];

  constructor(private blogPostService: BlogPostService) { }

  ngOnInit(): void {
    this.getBlogPosts();
  }

  getBlogPosts(): void {
    this.blogPostService.getBlogPosts()
      .subscribe(blogPosts => this.blogPosts = blogPosts);
  }

}
