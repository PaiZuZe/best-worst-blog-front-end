import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Author } from './author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  AUTHORS: Author[] = [{
    id: 1,
    firstName: "Bob",
    lastName: "Maximillian Gustav III"
  },
  {
    id: 2,
    firstName: "Boba",
    lastName: "Asunsão da Paz"
  }];

  constructor() { }

  getAuthors(): Observable<Author[]> {
    const authors = of(this.AUTHORS);
    return authors;
  }

  getAuthor(id: number): Observable<Author> {
    const author = this.AUTHORS.find(x => x.id === id)!;
    return of(author);
  }
}
