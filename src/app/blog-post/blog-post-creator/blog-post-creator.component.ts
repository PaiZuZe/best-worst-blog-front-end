import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
    //authorId: new FormControl('', [Validators.required, Validators.pattern("[0-9]+")]),
  });

  constructor(private blogPostService: BlogPostService, private authorService: AuthorService, private router: Router) { }

  ngOnInit() {
    this.getAuthors();
    this.filteredAuthors = this.blogPostForm.get("authorId")!.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === "string" ? this._filter(value) : this.authors.slice())
      );
  }

  getAuthors() {
    this.authorService.getAuthors()
      .subscribe(authors => this.authors = authors);
  }

  onSubmit(): void {
    this.blogPostService.post(this.blogPostForm.value)
      .subscribe(resp => this.router.navigateByUrl(`/posts/${resp.id}`));
  }

  displayFn(authorId: number): string {
    if (authorId) {
      let author: Author | undefined = this.authors.find(author => authorId === author.id);
      return author!.firstName + " " + author!.lastName;
    }
    return '';
  }

  private _filter(value: String): Author[] {
    const filterValue = value.toLowerCase();
    return this.authors.filter(option => (option.firstName.toLowerCase() + " " + option.lastName.toLowerCase()).includes(filterValue));
  }
}
