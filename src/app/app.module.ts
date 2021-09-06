import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorEditorComponent } from './author-editor/author-editor.component';
import { AuthorCreatorComponent } from './author-creator/author-creator.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { BlogPostCreatorComponent } from './blog-post-creator/blog-post-creator.component';
import { BlogPostDetailComponent } from './blog-post-detail/blog-post-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    AuthorDetailComponent,
    AuthorEditorComponent,
    AuthorCreatorComponent,
    PageNotFoundComponent,
    HomeComponent,
    BlogPostsComponent,
    BlogPostCreatorComponent,
    BlogPostDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
