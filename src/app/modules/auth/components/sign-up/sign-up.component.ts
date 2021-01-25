import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
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

    this.apiService.signUp(userInfo)
    .subscribe((res) => {
      console.log(res);
      this.router.navigate(['/auth/sign-in']);
      this.signUpForm.reset();
    });
  }
}
