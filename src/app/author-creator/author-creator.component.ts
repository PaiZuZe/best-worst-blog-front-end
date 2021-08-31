import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthorService } from '../service/author.service';

@Component({
  selector: 'app-author-creator',
  templateUrl: './author-creator.component.html',
  styleUrls: ['./author-creator.component.css']
})
export class AuthorCreatorComponent implements OnInit {
  
  authorForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
  
  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authorService.post(this.authorForm.value)
      .subscribe(resp => console.log(resp));
  }

}
