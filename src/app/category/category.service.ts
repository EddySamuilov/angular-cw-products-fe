import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    let url = `/api/categories`;
    // if (limit) {
    //   url += `?limit=${limit}`;
    // }

    return this.http.get<Category[]>(url);
  }
}
