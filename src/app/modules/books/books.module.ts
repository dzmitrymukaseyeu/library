import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { BooksRoutingModule } from './books-routing.module';
import { SearchComponent } from './components/search/search.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { SharedModule } from '../../shared/shared.module'





@NgModule({
  declarations: [SearchComponent, CatalogComponent],
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
    MatSelectModule,
    SharedModule
  ]
})
export class BooksModule { }
