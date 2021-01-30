import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService, PreloaderService, UserService } from './../../../../services';
import { ResBooksDefinition, BookDefinition } from './../../../../shared/interfaces';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize, takeUntil} from 'rxjs/operators'

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  books: BookDefinition[] = [];
  filteredBooks = new BehaviorSubject([]);
  destroy$ = new Subject();

  constructor(
    private apiService: ApiService,
    private preloaderService: PreloaderService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.preloaderService.show();
    this.apiService.getBooks()
      .pipe(
        finalize(() => this.preloaderService.hide()),
        takeUntil(this.destroy$)
      )
      .subscribe((res: ResBooksDefinition) => {
        this.books = res.content;
        this.filteredBooks.next(res.content);
      });
  }

  onDeleteBook(id: string) {
    const userData = this.userService.userData$.value;

    if (userData && userData.favoriteBooks) {
      this.userService.userData$.next({
        ...userData,
        favoriteBooks: userData.favoriteBooks.filter(bookId => bookId !== id)
      });
    }

    this.books = this.books.filter(book => book._id !== id);
  }

  onFilteredBooks(books: BookDefinition[]) {
    this.books = books;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
