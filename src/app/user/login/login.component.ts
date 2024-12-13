import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

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
    private userService: UserService,
    private toastr: ToastrService,
  ) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.invalid) {
      alert('Login form is invalid!');
      return;
    }
    
    const { username, password } = loginForm.value;
    
    this.userService.login( username, password ).subscribe({
      next:(response) => {
        this.router.navigateByUrl('/home');
      }, error:(err) => {
        this.toastr.error('Invalid username or password', err.error);
        this.hasLoginError = true;
      }
    });

    loginForm.reset();
  }
}
