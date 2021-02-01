import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {


  constructor(
    private _snackBar: MatSnackBar
  ) { }

  show(
    message: string
  ){
    const obj = {
      message: message,
      type: 'error'
    };

    this._snackBar.open(obj.message,'' ,{
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }
}
