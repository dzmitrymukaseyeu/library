import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, PreloaderService } from '../../../../services';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil} from 'rxjs/operators'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private preloaderService: PreloaderService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
        firstName: [null, [
          Validators.required,
          Validators.pattern(/^[A-Z -]+$/i)
        ]],
        lastName: [null, [
          Validators.required,
          Validators.pattern(/^[A-Z -]+$/i)
        ]],
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

  onSignUpSubmit(event: Event) {
    event.preventDefault();
    const userInfo = this.signUpForm.value;

    this.preloaderService.show();
    this.apiService.signUp(userInfo)
      .pipe(
        finalize(() => this.preloaderService.hide()),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.router.navigate(['/auth/sign-in']);
        this.signUpForm.reset();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
