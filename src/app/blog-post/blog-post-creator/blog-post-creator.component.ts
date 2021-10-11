import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { debounceTime, filter, map, startWith, switchMap } from 'rxjs/operators';
import { Author } from '../../model/author';
import { AuthorService } from '../../service/author.service';

import { BlogPostService } from '../../service/blog-post.service';

@Component({
  selector: 'app-blog-post-creator',
  templateUrl: './blog-post-creator.component.html',
  styleUrls: ['./blog-post-creator.component.css']
})
export class BlogPostCreatorComponent implements OnInit {

  authors: Array<Author> = [];
  filteredAuthors!: Observable<Author[]>;

  blogPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    textBody: new FormControl('', [Validators.required, Validators.maxLength(4000)]),
    authorId: new FormControl('', [Validators.required]),
  });

  constructor(private blogPostService: BlogPostService, private authorService: AuthorService, private router: Router) { }

  ngOnInit() {
    this.filteredAuthors = this.blogPostForm.get("authorId")!.valueChanges
      .pipe(
        startWith(''),
        debounceTime(200),
        switchMap(value => value.length >= 3 && typeof value === "string" ? this.authorService.getAuthorsByFullName(value) : of([]))
      );
  }

  displayFn(author: Author): string {
    return author ? author.firstName + " " + author.lastName : '';
  }

  onSubmit(): void {
    let author = this.blogPostForm.controls["authorId"]!.value;
    if (typeof author === "object") {
      this.blogPostForm.patchValue({authorId: author.id});
      this.blogPostService.post(this.blogPostForm.value)
      .subscribe(resp => this.router.navigateByUrl(`/posts/${resp.id}`));
    }
  }
}
