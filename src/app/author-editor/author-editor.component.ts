import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-editor',
  templateUrl: './author-editor.component.html',
  styleUrls: ['./author-editor.component.css']
})
export class AuthorEditorComponent implements OnInit {
  
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
