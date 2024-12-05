import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
  import { NgClass } from '@angular/common';
import { UserService } from '../user.service';
import { UserLogin } from '../../types/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hasLoginError = false;

  isRequired(field: NgModel) {
    return field.touched && (field.errors?.['required']);
  }

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.invalid) {
      alert('Login form is invalid!');
      return;
    }
    
    const { username, password } = loginForm.value;
    
    this.userService.login( username, password ).subscribe({
      next:(response) => {
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/home');
      }, error:(err) => {
        this.hasLoginError = true;
        // alert(err.error);
      }
    });

    loginForm.reset();
  }
}
