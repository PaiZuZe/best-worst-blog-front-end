import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthorService } from '../service/author.service';

@Component({
  selector: 'app-author-editor',
  templateUrl: './author-editor.component.html',
  styleUrls: ['./author-editor.component.css']
})
export class AuthorEditorComponent implements OnInit {
  
  @Input() firstName?: string;
  @Input() lastName?: string;

  authorForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
  
  constructor(private route: ActivatedRoute, private authorService: AuthorService, private location: Location, private router: Router) { 
  }

  ngOnInit(): void {
    this.authorForm.patchValue({
      firstName: this.firstName,
      lastName: this.lastName  
    });
  }

  onSubmit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.authorService.put(id, this.authorForm.value)
      .subscribe(resp => {
        this.router.onSameUrlNavigation = "reload";
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigate([this.router.url])
    });
  }

}
