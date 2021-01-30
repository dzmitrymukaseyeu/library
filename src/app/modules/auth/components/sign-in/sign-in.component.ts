import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  ApiService,
  UserService,
  TokenService,
  PreloaderService
} from '../../../../services';
import { ResUserDefinition } from '../../../../../app/shared/interfaces';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public userService: UserService,
    public tokenService: TokenService,
    private router: Router,
    private preloaderService: PreloaderService
  ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: [null, [
        Validators.required,
        Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(5),
      ]]
    })
  }

  onsignInSubmit(event: Event) {
    event.preventDefault();
    const userSignInValue = this.signInForm.value;

    this.apiService.signIn(userSignInValue)
      .pipe(
        finalize(() => this.preloaderService.hide()),
        takeUntil(this.destroy$)
      )
      .subscribe((res: ResUserDefinition) => {
        localStorage.setItem('accessToken', res.content.token.accessToken);
        localStorage.setItem('refreshToken', res.content.token.refreshToken);

        this.tokenService.tokenData$.next({
          accessToken: res.content.token.accessToken,
          refreshToken: res.content.token.refreshToken
        });
        this.userService.userData$.next(res.content.user);
        this.router.navigate(['/books']);
        this.signInForm.reset();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
