import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { BlogPost } from '../model/blog-post';
import { BlogPostService } from '../service/blog-post.service';

@Component({
  selector: 'app-blog-post-detail',
  templateUrl: './blog-post-detail.component.html',
  styleUrls: ['./blog-post-detail.component.css']
})
export class BlogPostDetailComponent implements OnInit {

  @Input() blogPost?: BlogPost;

  constructor(private blogPostService: BlogPostService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getBlogPost();
  }

  getBlogPost(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.blogPostService.getBlogPost(id)
      .subscribe(blogPost => this.blogPost = blogPost);
  }

  delete(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.blogPostService.delete(id)
      .subscribe(resp => console.log(resp));
  }

}
