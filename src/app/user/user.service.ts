import { Injectable, OnDestroy, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { User, UserLogin, UserRegister } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | UserLogin | UserRegister | null>(null);

  user: User | null = null;

  get isLogged(): boolean {
    return this.user$$.value !== null;
  }

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser) as User;
      this.user$$.next(this.user);
    }
  }

  login(username: string, password: string): Observable<UserLogin> {
    return this.http
      .post<UserLogin>('/api/users/login', { username, password })
      .pipe(
        tap((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.user$$.next(user);
        }
      ))
  }

  register(registerRequest: UserRegister): Observable<UserRegister> {
    return this.http
      .post<UserRegister>('/api/users/register', registerRequest)
      .pipe(tap((user) => this.user$$.next(user)));
  }

  getUserProfile(): Observable<User> {
    const url = `/api/users/profile?username=${this.user?.username}`;
    return this.http
      .get<User>(url)
      .pipe(tap((user) => this.user$$.next(user)));
  }

  updateUserProfile(updateUserProfileRequest: User): Observable<User> {
    const url = `/api/users/profile?username=${this.user?.username}`;
    return this.http
      .put<User>(url, updateUserProfileRequest)
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    localStorage.clear();
    return this.user$$.next(null);
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }
}
