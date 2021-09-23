import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Author } from '../model/author';
import { AuthorService } from '../service/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: Author[] = [];
  length: number = 100;
  size: number = 5;
  pageIndex: number = 0;

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.getAuthorsPages();
  }

  getAuthorsPages(): void {
    this.authorService.getAuthorsPage(this.size, this.pageIndex)
      .subscribe(page => {
        this.authors = page.content;
        this.length = page.totalElements
      });
  }

  handleEvent(event: PageEvent): void {
    this.size = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAuthorsPages();
  }
}
