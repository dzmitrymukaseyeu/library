import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  count: number = 0;
  isPreloaderState$ = new Subject<boolean>();

  constructor() { }

  show() {
    if(++this.count === 1) {
      this.isPreloaderState$.next(true);
    }
  };

  hide() {
    if(this.count === 0 || --this.count === 0) {
      this.isPreloaderState$.next(false);
    }
  };
}
