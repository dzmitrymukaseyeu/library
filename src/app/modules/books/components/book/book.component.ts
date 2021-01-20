import { Component, Input, OnInit } from '@angular/core';
import { ResBookDefinition, BookDefinition } from './../../../../shared/interfaces';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: BookDefinition;
  editText:boolean = true;

  constructor() { }

  ngOnInit(): void {

  }

  onEditBook($event) {
    this.editText = !this.editText;
    console.log(this.editText);
  }



}
