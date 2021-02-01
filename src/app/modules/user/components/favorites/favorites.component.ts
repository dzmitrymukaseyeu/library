import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, ApiService, PreloaderService } from '@app/services';
import { BookDefinition, ResBooksDefinition, UserDefinition } from '@app/shared/interfaces';
import { Subject } from 'rxjs';
import { mergeMap, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  isButtonVisible = false;
  books: BookDefinition[] = [];
  private destroy$ = new Subject();

  constructor(
    public userService: UserService,
    private apiService: ApiService,
    private preloaderService: PreloaderService
  ) { }

  ngOnInit(): void {
    this.preloaderService.show();
    this.userService.userData$
      .pipe(
        mergeMap((res:UserDefinition) => {
          if (res && res.favoriteBooks) {
            return this.apiService
              .getFavoriteBooks({favoriteBooks: JSON.stringify(res.favoriteBooks)})
              .pipe(
                finalize(() => this.preloaderService.hide()),
                takeUntil(this.destroy$),
              );
          }
        })
      )
      .subscribe((res: ResBooksDefinition) => this.books = res.content)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
