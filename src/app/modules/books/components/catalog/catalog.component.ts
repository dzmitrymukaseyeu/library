import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../../services/api//api.service';
import { ResBooksDefinition, BookDefinition } from './../../../../shared/interfaces';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  books: BookDefinition[] = [];
  filteredBooks = new BehaviorSubject([]);


  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.getBooks()
    .subscribe((res: ResBooksDefinition) => {
      this.books = res.content;
      console.log(this.books);
      this.filteredBooks.next(res.content);
    });
  }

  onDeleteBook(id: string){
    this.books = this.books.filter(book => book._id !== id);
  }

  onFilteredBooks(content: any) {
    this.books = content;
  }
}
