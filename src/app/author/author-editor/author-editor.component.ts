import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthorService } from '../../service/author.service';
import { Author } from '../../model/author';

@Component({
  selector: 'app-author-editor',
  templateUrl: './author-editor.component.html',
  styleUrls: ['./author-editor.component.css']
})
export class AuthorEditorComponent implements OnInit {
  
  @Input() author!: Author;
  @Output() authorChange = new EventEmitter<Author>();

  authorForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });
  
  constructor(private route: ActivatedRoute, private authorService: AuthorService) { 
  }

  ngOnInit(): void {
    this.authorForm.patchValue({
      firstName: this.author.firstName,
      lastName: this.author.lastName  
    });
  }

  onSubmit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.authorService.put(id, this.authorForm.value)
      .subscribe(resp => this.authorChange.emit(resp));
  }

}
