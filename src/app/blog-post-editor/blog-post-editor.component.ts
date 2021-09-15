import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from '../service/blog-post.service';

@Component({
  selector: 'app-blog-post-editor',
  templateUrl: './blog-post-editor.component.html',
  styleUrls: ['./blog-post-editor.component.css']
})
export class BlogPostEditorComponent implements OnInit {
  @Input() title?: string;
  @Input() textBody?: string;
  @Input() authorId?: number;

  blogPostForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]), 
    textBody: new FormControl('', [Validators.required, Validators.maxLength(4000)]),
    authorId: new FormControl('', [Validators.required])
  });

  constructor(private blogPostService: BlogPostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.blogPostForm.patchValue({
      title: this.title,
      textBody: this.textBody,
      authorId: this.authorId
    });
  }

  onSubmit() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.blogPostService.put(id, this.blogPostForm.value)
    .subscribe(resp => {
      this.router.onSameUrlNavigation = "reload";
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigate([this.router.url]);
    });
  }

}
