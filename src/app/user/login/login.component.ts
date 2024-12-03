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
  hasPasswordErrors(password: NgModel) {
    return password.touched && (password.errors?.['required'] || password.errors?.['minlength']);
  }
  hasEmailErrors(email: NgModel) {
    return email.touched && (email.errors?.['required'] || email.errors?.['myEmailValidator']);
  }

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.invalid) {
      alert('Inavlid username or password!');
      return;
    }
    
    const { email, password } = loginForm.value;
    
    this.userService.login(email, password).subscribe({
      next:(response) => {
        // console.log("Received response" + response.token);
        this.router.navigateByUrl('/home');
      }, error:(err) => {
        console.log("Received err response!", err);
      }
    });

    loginForm.reset();
  }
}
