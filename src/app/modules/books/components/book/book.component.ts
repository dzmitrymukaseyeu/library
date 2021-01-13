import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  editText:boolean = true;

  constructor() { }

  ngOnInit(): void {

  }

  onEditBook($event) {
    this.editText = !this.editText;
    console.log(this.editText);
  }



}
