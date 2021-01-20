import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../../services/api//api.service';
import { ResBookDefinition, BookDefinition } from './../../../../shared/interfaces';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  books: BookDefinition[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getBooks()
    .subscribe((res: ResBookDefinition) => this.books = res.content);
  }
}
