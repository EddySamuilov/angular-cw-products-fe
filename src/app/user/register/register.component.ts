import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';
import { passwordValidator } from '../../utils/password-validator.validator';
import { emailValidator } from '../../utils/email.validator';
import { UserRegister } from '../../types/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [ Validators.required, emailValidator() ]),
    passGroup: new FormGroup({
      password: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, {
      validators: [passwordValidator('password', 'confirmPassword')],
    }),
  });

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  isFieldRequired(controlName: string): boolean {
    return (
      this.registerForm.get(controlName)?.touched &&
      this.registerForm.get(controlName)?.errors?.['required']
    );
  }

  isFieldBelowMinLenght(controlName: string): boolean {
    return (
      this.registerForm.get(controlName)?.touched &&
      this.registerForm.get(controlName)?.errors?.['minlength']
    );
  }

  get getPassGroup() {
    return this.registerForm.get('passGroup');
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      console.error('Invalid form!');
      return;
    }

    const registerRequest: UserRegister = {
      username: this.registerForm.value.username!,
      firstName: this.registerForm.value.firstName!,
      lastName: this.registerForm.value.lastName!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.passGroup?.password!,
      confirmPassword: this.registerForm.value.passGroup?.confirmPassword!,
    };

    this.userService.register(registerRequest)
      .subscribe({
        next: (data) => {
          this.registerForm.reset();
          this.router.navigateByUrl('/login');
        }, 
        error: (err) => {
          console.log('MY --- ERROR', err);
        },
      });
  }
}
