import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenDefinition } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenData$ = new BehaviorSubject<TokenDefinition>(null);

  constructor() { }
}
