import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationService } from '../service/donation.service';

@Component({
  selector: 'app-donation-creator',
  templateUrl: './donation-creator.component.html',
  styleUrls: ['./donation-creator.component.css']
})
export class DonationCreatorComponent implements OnInit {

  @Input() authorId?: number;

  donationForm: FormGroup = new FormGroup({
    donationAmount: new FormControl('', [Validators.required, Validators.pattern("[0-9]+.?([0-9]){0,2}")]),
    authorId: new FormControl('')
  });

  constructor(private donationService: DonationService, private router: Router) { }

  ngOnInit(): void {
    this.donationForm.patchValue({authorId: this.authorId});
  }

  onSubmit(): void {
    this.donationService.post(this.donationForm.value)
      .subscribe(resp => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = "reload";
        this.router.navigate([this.router.url]);
      });
  }
}
