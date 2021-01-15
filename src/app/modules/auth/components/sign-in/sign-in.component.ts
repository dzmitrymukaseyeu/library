import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup

  constructor(
    private formBuilder: FormBuilder
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
    const userInfo = this.signInForm.value;
    console.log(userInfo);
    // this.apiService.signUp(userInfo)
    //   .pipe(
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe((res:ResDefinition) => {
    //     this.toastsService.show(res.code, res.message);
    //     this.modalService.modalData$.next(false);
    //   },
    //   ({error}: { error: {
    //     code: number,
    //     message: string
    //   }}) => {
    //     this.toastsService.show(error.code, error.message);
    //   })

    // if(!this.signUpForm.valid) {
    //   return;
    // }
  }

}
