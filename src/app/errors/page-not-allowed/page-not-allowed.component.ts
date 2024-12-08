import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-page-not-allowed',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-not-allowed.component.html',
  styleUrl: './page-not-allowed.component.css'
})
export class PageNotAllowedComponent {

  constructor(private userService: UserService) {}

  get isLoggedIn() {
    return this.userService.isLogged;
  }
}
