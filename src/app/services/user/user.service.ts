import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDefinition } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData$ = new BehaviorSubject<UserDefinition>(null);

  constructor() { }
}
