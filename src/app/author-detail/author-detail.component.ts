import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Author } from '../model/author';
import { AuthorService } from '../service/author.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {

  @Input() author?: Author;

  constructor(private route: ActivatedRoute, private authorService: AuthorService, private location: Location) { }

  ngOnInit(): void {
    this.getAuthor();
  }

  getAuthor(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.authorService.getAuthor(id)
      .subscribe(author => this.author = author);
  }

  delete(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.authorService.deleteById(id)
      .subscribe(resp => console.log(resp));
  }

  donate(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.authorService.donate(id)
      .subscribe(resp => console.log(resp));
  }

}
