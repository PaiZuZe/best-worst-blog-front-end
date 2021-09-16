import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Author } from '../model/author';
import { AuthorService } from '../service/author.service';
import { BlogPost } from '../model/blog-post';
import { DonationService } from '../service/donation.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {

  author?: Author;
  blogPosts?: BlogPost[];

  constructor(private authorService: AuthorService, private donationService: DonationService, private location: Location, private route: ActivatedRoute,private router: Router) { }

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
      .subscribe(resp => this.router.navigateByUrl("/authors"));
  }
}
