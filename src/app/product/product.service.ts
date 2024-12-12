import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductAdd, ProductUpsert } from '../types/product';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private product$$ = new BehaviorSubject<Product | ProductUpsert | null>(null);
  public product$ = this.product$$.asObservable();

  product: Product | null = null;

  constructor(private http: HttpClient, private userService: UserService) {
    this.product$.subscribe((product) => {
      this.product = product as Product;
    })
  }

  getProducts(categoryId: string | null): Observable<Product[]> {
    let url = `/api/products`;
    if (categoryId) {
      url += `?categoryId=${categoryId}`;
    }

    return this.http.get<Product[]>(url);
  }

  getSingleProduct(productId: number): Observable<Product> {
    return this.http
      .get<Product>(`/api/products/${productId}`)
      .pipe(tap((product) => this.product$$.next(product)));
  }

  addProduct(product: ProductAdd): Observable<number> {
    const currentUser = this.userService.user?.username;
    if (!currentUser) {
      throw new Error('User is not logged in');
    }

    const productWithUser = { ...product, username: currentUser };
    
    return this.http
      .post<number>('/api/products/add', productWithUser);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http
      .put<Product>(`/api/products/${product.id}`, product)
      .pipe(tap((product) => this.product$$.next(product)));
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.http
      .delete<Product>(`/api/products/${productId}`)
      .pipe(tap((product) => this.product$$.next(product)));
  }
}
