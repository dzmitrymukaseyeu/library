import { Injectable } from '@angular/core';
import { UserDefinition } from '@app/shared/interfaces';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData$ = new BehaviorSubject<UserDefinition>(null);

  constructor() { }
}
