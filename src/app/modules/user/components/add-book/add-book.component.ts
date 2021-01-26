import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../services';
import { Router } from '@angular/router';

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
  ]

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addBookForm = this.formBuilder.group({
      title: [null, [
        Validators.required,
        Validators.pattern(/^[A-Z -]+$/i)
      ]],
      author: [null, [
        Validators.required,
        Validators.pattern(/^[A-Z -]+$/i)
      ]],
      genre: [null, [
        Validators.required,
      ]],
      description: [null, [
        Validators.required,
      ]],
      published: [new Date(), [
        Validators.required,
      ]],
      link: [null, [
        Validators.required,
      ]],
      img: [null, [
        Validators.required,
      ]],
    })
  }

  addBookSubmit(event: Event) {
    event.preventDefault();
    const bookInfo = this.addBookForm.value;
    console.log(bookInfo);

    this.apiService.addBook(bookInfo)
    .subscribe((res) => {
      console.log(res);
      // this.router.navigate(['/auth/sign-in']);
      // this.signUpForm.reset();
    });
  }

}
