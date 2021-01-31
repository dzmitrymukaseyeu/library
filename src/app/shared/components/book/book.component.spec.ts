import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ApiService } from '../../../services';
import { BookComponent } from './book.component';

const bookMock = {
  _id: 'test-book-id',
  author: 'Test author',
  published: new Date(),
  genre: 'Test genre',
  description: 'Test description',
  img: 'http://test-img.jpg',
  link: 'http://test-link.jpg',
  created: new Date(),
  modified: new Date(),
  title: 'Test title',
};

describe('BookComponent', () => {
  let apiService: ApiService;
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatMenuModule,
        MatIconModule
      ],
      providers: [ApiService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    component.book = bookMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show admin actions', () => {
    component.isButtonVisible = true;
    // @ts-ignore
    component.userService.userData$.next({ accessType: 3 });

    fixture.detectChanges();
    const adminActionsBtn: DebugElement = fixture.debugElement.query(By.css('.b-book__btn-link.mat-menu-trigger'));
    adminActionsBtn.nativeElement.click();

    const editBtn: DebugElement = fixture.debugElement.query(By.css('[type="button"][title="Edit"]'));
    const deleteBtn: DebugElement = fixture.debugElement.query(By.css('[type="button"][title="Delete"]'));

    expect(editBtn).toBeTruthy();
    expect(deleteBtn).toBeTruthy();
  });

  it('should hide admin actions', () => {
    component.isButtonVisible = true;
    // @ts-ignore
    component.userService.userData$.next({ accessType: 1 });

    fixture.detectChanges();
    const adminActionsBtn: DebugElement = fixture.debugElement.query(By.css('.b-book__btn-link.mat-menu-trigger'));
    expect(adminActionsBtn).toBeNull();
  });

  it('should be liked', () => {
    // @ts-ignore
    component.userService.userData$.next({ favoriteBooks: [bookMock._id] });
    fixture.detectChanges();

    const likeIcon: DebugElement = fixture.debugElement.query(By.css('.b-book__btn-like mat-icon'));
    const isLiked = likeIcon.nativeElement.textContent.includes('favorite');

    expect(isLiked).toBeTrue();
  });

  it('should be not liked', () => {
    // @ts-ignore
    component.userService.userData$.next({ favoriteBooks: [] });
    fixture.detectChanges();

    const likeIcon: DebugElement = fixture.debugElement.query(By.css('.b-book__btn-like mat-icon'));
    const isNotLiked = likeIcon.nativeElement.textContent.includes('favorite_border');

    expect(isNotLiked).toBeTrue();
  });

  it('should be updated', () => {
    const titleToUpdate = 'Test title 1';
    // @ts-ignore
    component.editMode = true;
    component.bookEditForm.controls.title.setValue(titleToUpdate);
    const updatedBook = component.bookEditForm.value;

    spyOn(apiService, 'updateBook').and.returnValue(of({ content: updatedBook }));
    component.updateBook(bookMock._id);
    fixture.detectChanges();

    const bookTitle: DebugElement = fixture.debugElement.query(By.css('.b-book__content-title'));
    const isTitleChanged = bookTitle.nativeElement.textContent.includes(titleToUpdate);

    expect(isTitleChanged).toBeTrue();
    expect(component.book).toBe(updatedBook);
    expect(component.editMode).toBeFalse();
  });
});
