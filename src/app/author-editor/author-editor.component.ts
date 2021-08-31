import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthorService } from '../service/author.service';

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
  
  constructor(private route: ActivatedRoute, private authorService: AuthorService, private location: Location) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.authorService.put(id, this.authorForm.value)
      .subscribe(resp => console.log(resp));
  }

}
