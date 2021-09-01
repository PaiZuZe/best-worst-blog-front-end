import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Author } from '../model/author';
import { AuthorService } from '../service/author.service';
import { BlogPost } from '../model/blog-post';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {

  @Input() author?: Author;
  @Input() blogPosts?: BlogPost[];

  constructor(private authorService: AuthorService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAuthor();
    this.getBlogPosts();
  }

  getAuthor(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.authorService.getAuthor(id)
      .subscribe(author => this.author = author);
  }

  getBlogPosts(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.authorService.getAuthorBlogPosts(id)
      .subscribe(blogPosts => this.blogPosts = blogPosts);
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
