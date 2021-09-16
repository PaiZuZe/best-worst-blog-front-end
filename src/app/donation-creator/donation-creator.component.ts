import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Author } from '../model/author';
import { DonationService } from '../service/donation.service';

@Component({
  selector: 'app-donation-creator',
  templateUrl: './donation-creator.component.html',
  styleUrls: ['./donation-creator.component.css']
})
export class DonationCreatorComponent implements OnInit {

  @Input() authorId?: number;
  @Input() author!: Author;
  @Output() authorChange = new EventEmitter<Author>();

  donationForm: FormGroup = new FormGroup({
    donationAmount: new FormControl('', [Validators.required, Validators.pattern("[0-9]+.?([0-9]){0,2}")]),
    authorId: new FormControl('')
  });

  constructor(private donationService: DonationService, private router: Router) { }

  ngOnInit(): void {
    this.donationForm.patchValue({authorId: this.author.id});
  }

  onSubmit(): void {
    this.donationService.post(this.donationForm.value)
      .subscribe(resp => {
        this.author.balance = Number(this.author.balance) + resp.donationAmount;
        this.authorChange.emit(this.author);
      });
  }
}
