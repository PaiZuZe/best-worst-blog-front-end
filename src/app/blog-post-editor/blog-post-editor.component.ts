import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../model/blog-post';
import { BlogPostService } from '../service/blog-post.service';

@Component({
  selector: 'app-blog-post-editor',
  templateUrl: './blog-post-editor.component.html',
  styleUrls: ['./blog-post-editor.component.css']
})
export class BlogPostEditorComponent implements OnInit {
  
  @Input() blogPost!: BlogPost;
  @Input() authorId!: number;
  @Output() blogPostChange = new EventEmitter<BlogPost>();

  blogPostForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]), 
    textBody: new FormControl('', [Validators.required, Validators.maxLength(4000)]),
    authorId: new FormControl('', [Validators.required])
  });

  constructor(private blogPostService: BlogPostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.blogPostForm.patchValue({
      title: this.blogPost.title,
      textBody: this.blogPost.textBody,
      authorId: this.authorId
    });
  }

  onSubmit() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.blogPostService.put(id, this.blogPostForm.value)
      .subscribe(resp => this.blogPostChange.emit(resp));
  }

}
