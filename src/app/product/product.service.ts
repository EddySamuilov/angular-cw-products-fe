import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductUpsert } from '../types/product';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private product$$ = new BehaviorSubject<Product | ProductUpsert | null>(null);
  public product$ = this.product$$.asObservable();

  // product: Product | null = null;

  constructor(private http: HttpClient) {
    // this.product$.subscribe((product) => {
    //   this.product = product as Product;
    // })
  }

  getProducts(): Observable<Product[]> {
    let url = `/api/products`;
    // if (limit) {
    //   url += `?limit=${limit}`;
    // }

    return this.http.get<Product[]>(url);
  }

  getSingleProduct(productId: number): Observable<Product> {
    return this.http
      .get<Product>(`/api/products/${productId}`)
      .pipe(tap((product) => this.product$$.next(product)));
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http
      .put<Product>(`/api/products/${product.id}`, product)
      .pipe(tap((product) => this.product$$.next(product)));
  }
}
