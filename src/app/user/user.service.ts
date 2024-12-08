import { Injectable, OnDestroy } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { User, UserLogin, UserRegister } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | UserLogin | UserRegister | null>(null);
  private user$ = this.user$$.asObservable();
  private userSubscription: Subscription | null = null;

  user: User | UserLogin | UserRegister | null = null;

  get isLogged(): boolean {
    return localStorage.getItem('token') !== null;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    })
  }

  login(username: string, password: string): Observable<UserLogin> {
    return this.http
      .post<UserLogin>('/api/users/login', { username, password })
      .pipe(tap((user) => this.user$$.next(user)));
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
    this.userSubscription?.unsubscribe();
    localStorage.clear();
  }
}
