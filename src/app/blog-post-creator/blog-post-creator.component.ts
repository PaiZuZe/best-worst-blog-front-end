import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthorService } from '../service/author.service';

import { BlogPostService } from '../service/blog-post.service';

@Component({
  selector: 'app-blog-post-creator',
  templateUrl: './blog-post-creator.component.html',
  styleUrls: ['./blog-post-creator.component.css']
})
export class BlogPostCreatorComponent implements OnInit {

  authorsIds: Array<String> = [];
  filteredAuthorsIds!: Observable<String[]>;

  blogPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    textBody: new FormControl('', [Validators.required, Validators.maxLength(4000)]),
    authorId: new FormControl('', [Validators.required]),
    //authorId: new FormControl('', [Validators.required, Validators.pattern("[0-9]+")]),
  });

  constructor(private blogPostService: BlogPostService, private authorService: AuthorService, private router: Router) { }

  ngOnInit() {
    this.getAuthorsIds();
    this.filteredAuthorsIds = this.blogPostForm.get("authorId")!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  getAuthorsIds() {
    this.authorService.getAuthors()
      .subscribe(authors => { 
        authors.forEach(author => this.authorsIds.push(author.id.toString()));
      });
  }

  onSubmit(): void {
    this.blogPostService.post(this.blogPostForm.value)
      .subscribe(resp => this.router.navigateByUrl(`/posts/${resp.id}`));
  }

  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    return this.authorsIds.filter(option => option.toLowerCase().includes(filterValue));
  }
}
