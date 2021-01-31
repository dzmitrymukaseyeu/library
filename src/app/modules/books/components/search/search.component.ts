import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { ApiService, PreloaderService } from '../../../../services';
import { BookDefinition, ResBooksDefinition } from '../../../../shared/interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {
  @Output() filteredBooks = new EventEmitter<BookDefinition[]>();
  private destroy$ = new Subject();
  searchBookForm: FormGroup;
  bookGenres: {value: string, viewValue: string}[] = [
    {value: 'null', viewValue: 'Any genre'},
    {value: 'Biography', viewValue: 'Biography'},
    {value: 'Crime', viewValue: 'Crime'},
    {value: 'Fiction', viewValue: 'Fiction'},
    {value: 'IT', viewValue: 'IT'},
    {value: 'Education', viewValue: 'Education'},
  ];
  selectedGenre = this.bookGenres[0].value;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private preloaderService: PreloaderService
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

    this.preloaderService.show()
    this.apiService.getBooks(bookInfo)
      .pipe(
        finalize(() => this.preloaderService.hide()),
        takeUntil(this.destroy$)
      )
      .subscribe((res: ResBooksDefinition) => this.filteredBooks.emit(res.content));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
