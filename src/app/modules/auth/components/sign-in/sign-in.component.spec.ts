import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule,  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form', () => {
    const form = component.signInForm;
    expect(form.valid).toBeFalse();
  });

  it('should validate form 1', () => {
    const form = component.signInForm;
    form.controls.email.setValue('wewew@tut');
    form.controls.password.setValue('12345')
    expect(form.valid).toBeFalse();
  });

  it('should validate form 2', () => {
    const form = component.signInForm;
    form.controls.email.setValue('wewew@tut.by');
    form.controls.password.setValue('123')
    expect(form.valid).toBeFalse();
  });

  it('should validate form 3', () => {
    const form = component.signInForm;
    form.controls.email.setValue('wewew@tut.by');
    form.controls.password.setValue('12345')
    expect(form.valid).toBeTrue();
  });
});
