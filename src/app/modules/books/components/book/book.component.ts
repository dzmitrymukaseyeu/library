import { ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { ResBookDefinition, BookDefinition } from './../../../../shared/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ObjectId } from 'mongoose';
import { ApiService } from './../../../../services';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: BookDefinition;
  editText: boolean = true;
  bookEditForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public apiService: ApiService,
    private cd: ChangeDetectorRef
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
  })
  }

  updateBook(id: ObjectId) {
    const bookInfo = this.bookEditForm.value;
    const bookUpdateData = {
      filter: {
        _id: id
      },
      update: bookInfo
    }

    this.apiService.updateBooks(bookUpdateData)
    .subscribe((res:ResBookDefinition) => {
      this.book.title = res.content.title;
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
    .subscribe((res => console.log(res)))
  }

}
