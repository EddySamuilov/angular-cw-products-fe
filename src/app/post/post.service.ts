import { Injectable } from '@angular/core';
import { Post, PostAdd, PostUpdate } from '../types/post';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private post$$ = new BehaviorSubject<Post | null>(null);
  public post$ = this.post$$.asObservable();

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`/api/posts`);
  }

  getSinglePost(postId: number): Observable<Post> {
    return this.http
      .get<Post>(`/api/posts/${postId}`)
      .pipe(tap((post) => this.post$$.next(post)));
  }

  addPost(post: PostAdd): Observable<Post> {
    const currentUser = this.userService.user?.username;
    if (!currentUser) {
      throw new Error('User is not logged in');
    }

    const postWithUser = { ...post, username: currentUser };
    
    return this.http
      .post<Post>('/api/posts/add', postWithUser);
  }

  updatePost(post: PostUpdate): Observable<Post> {
    const currentUser = this.userService.user?.username;
    if (!currentUser) {
      throw new Error('User is not logged in');
    }

    const postWithUser = { ...post, username: currentUser };

    return this.http
      .put<Post>(`/api/posts/${post.id}`, postWithUser)
      .pipe(tap((post) => this.post$$.next(post)));
  }

  // deleteProduct(productId: number): Observable<Product> {
  //   return this.http
  //     .delete<Product>(`/api/products/${productId}`)
  //     .pipe(tap((product) => this.post$$.next(product)));
  // }
}
