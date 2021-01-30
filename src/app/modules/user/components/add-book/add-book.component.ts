import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService, PreloaderService } from '../../../../services';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  addBookForm: FormGroup;
  bookGenres: string[] = [
    'Biography',
    'Crime',
    'Fiction',
    'IT',
    'Education'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private preloaderService: PreloaderService
  ) { }

  ngOnInit(): void {
    this.addBookForm = this.formBuilder.group({
      title: [null, [
        Validators.required,
        Validators.pattern(/^[A-Z -]+$/i),
      ]],
      author: [null, [
        Validators.required,
        Validators.pattern(/^[A-Z -]+$/i),
      ]],
      genre: [null, [
        Validators.required,
      ]],
      description: [null, [
        Validators.required,
      ]],
      published: [new Date().toISOString().split('T')[0], [
        Validators.required,
      ]],
      link: [null, [
        Validators.required,
        Validators.pattern(/[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi)
      ]],
      img: [null, [
        Validators.required,
        Validators.pattern(/[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi)
      ]],
    })
  }

  addBookSubmit(event: Event) {
    event.preventDefault();
    const bookInfo = this.addBookForm.value;

    this.preloaderService.show()
    this.apiService.addBook(bookInfo)
      .pipe(
        finalize(() => this.preloaderService.hide()),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.router.navigate(['/books']);
        this.addBookForm.reset();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
