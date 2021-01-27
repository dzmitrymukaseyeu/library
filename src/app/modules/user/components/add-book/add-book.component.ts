import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../services';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
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
    private router: Router
  ) { }

  ngOnInit(): void {
    let options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timezone: 'UTC'
    };

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
      published: [new Date().toLocaleString("ru", options), [
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

    this.addBookForm.value.published = `${this.addBookForm.value.published}T00:00:00.000+00:00`
    console.log(this.addBookForm.value.published);

    this.apiService.addBook(bookInfo)
    .subscribe((res) => {
      console.log(res);
      this.router.navigate(['/books']);
      this.addBookForm.reset();
    });
  }

}
