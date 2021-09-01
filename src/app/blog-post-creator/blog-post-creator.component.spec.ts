import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostCreatorComponent } from './blog-post-creator.component';

describe('BlogPostCreatorComponent', () => {
  let component: BlogPostCreatorComponent;
  let fixture: ComponentFixture<BlogPostCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPostCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
