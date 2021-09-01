import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
    author_id: new FormControl(''),
  });

  constructor(private blogPostService: BlogPostService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.blogPostService.post(this.blogPostForm.value)
      .subscribe(resp => console.log(resp));
  }
}
