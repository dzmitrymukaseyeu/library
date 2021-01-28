import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ApiService } from '../../../../services';
import { ResBooksDefinition } from '../../../../shared/interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() filteredBooks = new EventEmitter<any>();
  destroy$ = new Subject();
  searchBookForm: FormGroup;
  bookGenres: {value: string, viewValue: string}[] = [
    {value: 'null', viewValue: 'All genre'},
    {value: 'Biography', viewValue: 'Biography'},
    {value: 'Crime', viewValue: 'Crime'},
    {value: 'Fiction', viewValue: 'Fiction'},
    {value: 'IT', viewValue: 'IT'},
    {value: 'Education', viewValue: 'Education'},
  ];
  selectedGenre = this.bookGenres[0].value;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.searchBookForm = this.formBuilder.group({
      title: [null, [
        Validators.required,
        Validators.pattern(/^[A-Z -]+$/i)
      ]],
      genre: [this.selectedGenre, [
        Validators.required,
      ]]
    })
  }

  searchBookSubmit(event: Event) {
    event.preventDefault();
    const bookInfo = this.searchBookForm.value;

    this.apiService.getBooks(bookInfo)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((res: ResBooksDefinition) => {
        this.filteredBooks.emit(res.content);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
