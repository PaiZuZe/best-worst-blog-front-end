import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BlogPostService } from '../service/blog-post.service';

@Component({
  selector: 'app-blog-post-creator',
  templateUrl: './blog-post-creator.component.html',
  styleUrls: ['./blog-post-creator.component.css']
})
export class BlogPostCreatorComponent implements OnInit {

  blogPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    textBody: new FormControl('', [Validators.required, Validators.maxLength(4000)]),
    authorId: new FormControl('', [Validators.required, Validators.pattern("[0-9]+")]),
  });

  constructor(private blogPostService: BlogPostService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.blogPostService.post(this.blogPostForm.value)
      .subscribe(resp => this.router.navigateByUrl(`/posts/${resp.id}`),
        error => window.alert(`${error.status}: This author already has a post with this title OR no author with this ID exists`)
      );
  }
}
