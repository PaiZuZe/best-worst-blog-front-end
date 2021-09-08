import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthorService } from '../service/author.service';

@Component({
  selector: 'app-author-creator',
  templateUrl: './author-creator.component.html',
  styleUrls: ['./author-creator.component.css']
})
export class AuthorCreatorComponent implements OnInit {
  
  authorForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });
  
  constructor(private authorService: AuthorService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authorService.post(this.authorForm.value)
      .subscribe(resp => this.router.navigateByUrl(`authors/${resp.id}`),
        error => window.alert(`${error.status}: This Author already exists`));
  }

}
