import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {concatMap, tap} from 'rxjs/operators';

import { BlogPost } from '../../model/blog-post';
import { BlogPostService } from '../../service/blog-post.service';
import { AuthorService } from '../../service/author.service';
import { Author } from '../../model/author';

@Component({
  selector: 'app-blog-post-detail',
  templateUrl: './blog-post-detail.component.html',
  styleUrls: ['./blog-post-detail.component.css']
})
export class BlogPostDetailComponent implements OnInit {

  blogPost!: BlogPost;
  author!: Author;

  constructor(private blogPostService: BlogPostService, private authorService: AuthorService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.getBlogPost();
  }

  getBlogPost(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.blogPostService.getBlogPost(id)
      .pipe(
        tap(blogPost => this.blogPost = blogPost),
        concatMap(blogPost => this.authorService.getAuthor(blogPost.authorId)),
        tap(author => this.author = author)
      ).subscribe();
  }

  delete(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.blogPostService.delete(id)
      .subscribe(resp => this.router.navigateByUrl("/posts"));
  }

}
