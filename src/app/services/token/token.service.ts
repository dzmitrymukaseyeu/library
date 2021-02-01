import { Injectable } from '@angular/core';
import { TokenDefinition } from '@app/shared/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenData$ = new BehaviorSubject<TokenDefinition>(null);

  constructor() { }
}
