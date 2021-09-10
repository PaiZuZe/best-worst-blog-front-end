import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationCreatorComponent } from './donation-creator.component';

describe('DonationCreatorComponent', () => {
  let component: DonationCreatorComponent;
  let fixture: ComponentFixture<DonationCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
