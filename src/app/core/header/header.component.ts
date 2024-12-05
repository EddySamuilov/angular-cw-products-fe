import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { LogoutComponent } from '../../user/logout/logout.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LogoutComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  get isUserLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor (private userService: UserService) {}

}
