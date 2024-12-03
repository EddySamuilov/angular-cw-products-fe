import { Injectable, OnDestroy } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { UserLogin } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserLogin | null>(null);
  private user$ = this.user$$.asObservable();
  private userSubscription: Subscription | null = null;

  user: UserLogin | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    })
  }

  login(email: string, password: string): Observable<UserLogin> {
    return this.http
      .post<UserLogin>('/api/users/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
