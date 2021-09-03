import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { BlogPostService } from '../service/blog-post.service';

@Component({
  selector: 'app-blog-post-creator',
  templateUrl: './blog-post-creator.component.html',
  styleUrls: ['./blog-post-creator.component.css']
})
export class BlogPostCreatorComponent implements OnInit {

  blogPostForm = new FormGroup({
    title: new FormControl(''),
    textBody: new FormControl(''),
    authorId: new FormControl(''),
  });

  constructor(private blogPostService: BlogPostService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.blogPostService.post(this.blogPostForm.value)
      .subscribe(resp => this.router.navigateByUrl(`/posts/${resp.id}`));
  }
}
