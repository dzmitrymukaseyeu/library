import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDefinition } from '@app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData$ = new BehaviorSubject<UserDefinition>(null);

  constructor() { }
}
