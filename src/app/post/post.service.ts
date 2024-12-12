import { Injectable } from '@angular/core';
import { Post } from '../types/post';
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
    private userService: UserService
  ) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`/api/posts`);
  }

  getSinglePost(postId: number): Observable<Post> {
    return this.http
      .get<Post>(`/api/posts/${postId}`)
      .pipe(tap((post) => this.post$$.next(post)));
  }

  // addProduct(product: ProductAdd): Observable<number> {
  //   const currentUser = this.userService.user?.username;
  //   if (!currentUser) {
  //     throw new Error('User is not logged in');
  //   }

  //   const productWithUser = { ...product, username: currentUser };
    
  //   return this.http
  //     .post<number>('/api/products/add', productWithUser);
  // }

  // updateProduct(product: Product): Observable<Product> {
  //   return this.http
  //     .put<Product>(`/api/products/${product.id}`, product)
  //     .pipe(tap((product) => this.post$$.next(product)));
  // }

  // deleteProduct(productId: number): Observable<Product> {
  //   return this.http
  //     .delete<Product>(`/api/products/${productId}`)
  //     .pipe(tap((product) => this.post$$.next(product)));
  // }
}
