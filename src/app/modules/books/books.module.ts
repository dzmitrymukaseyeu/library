import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { SearchComponent } from './components/search/search.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { BookComponent } from './components/book/book.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';





@NgModule({
  declarations: [SearchComponent, CatalogComponent, BookComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule
  ]
})
export class BooksModule { }
