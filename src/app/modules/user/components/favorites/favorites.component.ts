import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { UserService, ApiService } from './../../../../services';
import { BookDefinition, ResBooksDefinition, UserDefinition } from './../../../../shared/interfaces';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  isButtonVisible = false;
  books: BookDefinition[] = [];

  constructor(
    public userService: UserService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.userService.userData$
      .pipe(
        mergeMap((res:UserDefinition) => {
          if (res && res.favoriteBooks) {
            return this.apiService.getFavoriteBooks({favoriteBooks: JSON.stringify(res.favoriteBooks)})
          }
        })
      )
      .subscribe((res: ResBooksDefinition) => {
        this.books = res.content;
      })
  }

}
