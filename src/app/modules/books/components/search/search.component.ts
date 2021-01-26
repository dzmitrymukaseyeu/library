import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchBookForm: FormGroup;
  bookGenres: string[] = [
    'All genres',
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
    this.searchBookForm = this.formBuilder.group({
      title: [null, [
        Validators.required,
        Validators.pattern(/^[A-Z -]+$/i)
      ]],
      genre: [null, [
        Validators.required,
      ]]
    })
  }

  searchBookSubmit(event: Event) {
    event.preventDefault();
    const bookInfo = this.searchBookForm.value;
    console.log(bookInfo);

    this.apiService.getBooks(bookInfo)
    .subscribe((res) => {
      console.log(res);
    });
  }

}
