import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { ResBookDefinition, BookDefinition, ResUserDataDefinition } from '../../interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, UserService, PreloaderService} from '../../../services';
import { Subject } from 'rxjs';
import { finalize, takeUntil} from 'rxjs/operators'


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {
  @Input() isButtonVisible = true;
  @Input() book: BookDefinition;
  @Output() delbook = new EventEmitter<any>();
  editText = true;
  bookEditForm: FormGroup;
  likeState = false;
  private destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    protected userService: UserService,
    private preloaderService: PreloaderService
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
      published: [new Date(this.book.published).toISOString().split('T')[0], [
        Validators.required
      ]],
      link: [this.book.link, [
        Validators.required
      ]],
    });

    this.userService.userData$
      .subscribe(res => {
        if (res && res.favoriteBooks) {
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
        if (!res?.content) {
          return;
        }

        this.book = res.content;
      });

    this.editText = true;
  }

  onEditBook() {
    this.editText = !this.editText;
  }

  onDeleteBook(id: string) {
    this.preloaderService.show();
    this.apiService.deleteBook({id})
      .pipe(
        finalize(() => this.preloaderService.hide()),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.delbook.emit(id))
  }

  toogleFavorite(id: string, state: boolean) {
    this.preloaderService.show();
    this.apiService.toogleFavorite({id, state})
      .pipe(
        finalize(() => this.preloaderService.hide()),
        takeUntil(this.destroy$)
      )
      .subscribe(((res:ResUserDataDefinition) => this.userService.userData$.next(res.content)))
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
