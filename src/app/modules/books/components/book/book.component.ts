import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ResBookDefinition, BookDefinition } from './../../../../shared/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ObjectId } from 'mongoose';
import { ApiService, UserService } from './../../../../services';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: BookDefinition;
  @Output() delbook = new EventEmitter<any>() ;
  editText: boolean = true;
  bookEditForm: FormGroup;
  likeState = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.bookEditForm = this.formBuilder.group({
      title: [this.book.title, [
        Validators.required
      ]],
      author: [this.book.author, [
        Validators.required
      ]],
      genre: [this.book.genre, [
        Validators.required
      ]],
      description: [this.book.description, [
        Validators.required
      ]],
      published: [this.book.published, [
        Validators.required
      ]],
      link: [this.book.link, [
        Validators.required
      ]],
    });

  this.userService.userData$
    .subscribe(res => {
      if (res) {
        this.likeState = res.favoriteBooks.includes(this.book._id);
      }
    });
  }

  updateBook(id: string) {
    const bookInfo = this.bookEditForm.value;
    const bookUpdateData = {
      id,
      update: bookInfo
    }

    this.apiService.updateBooks(bookUpdateData)
    .subscribe((res:ResBookDefinition) => {
      this.book.title = res.content.title;
      this.book.author = res.content.author;
      this.book.genre = res.content.genre;
      this.book.description = res.content.description;
      this.book.published = res.content.published;
      this.book.link = res.content.link;
    });
    this.editText = true;
  }

  onEditBook() {
    this.editText = !this.editText;
    console.log(this.editText);
  }

  onDeleteBook(id: string) {
    console.log(id);
    this.apiService.deleteBook({id})
    .subscribe((res => {
      console.log(res)
    }))
    this.delbook.emit(id)
  }

  toogleFavorite(id: string, state: boolean) {
    console.log(state);
    this.apiService.toogleFavorite({id, state})
    .subscribe((res => {
      console.log(res)
      // @ts-ignore
      this.userService.userData$.next(res.content);
    }))
  }


}
