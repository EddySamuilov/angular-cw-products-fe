import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../types/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    let url = `/api/products`;
    // if (limit) {
    //   url += `?limit=${limit}`;
    // }

    return this.http.get<Product[]>(url);
  }

  getSingleProduct(productId: number): Observable<Product> {
    let url = `/api/products/${productId}`;
    // if (limit) {
    //   url += `?limit=${limit}`;
    // }

    return this.http.get<Product>(url);
  }
}
