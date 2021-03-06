import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsComponent } from './author/authors/authors.component';
import { AuthorDetailComponent } from './author/author-detail/author-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { BlogPostsComponent } from './blog-post/blog-posts/blog-posts.component';
import { BlogPostDetailComponent } from './blog-post/blog-post-detail/blog-post-detail.component';

const routes: Routes = [
  { path: 'authors', component: AuthorsComponent },
  { path: 'authors/:id', component: AuthorDetailComponent},
  { path: 'posts', component: BlogPostsComponent},
  { path: 'posts/:id', component: BlogPostDetailComponent},
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
