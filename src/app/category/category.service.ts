import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, CategoryAdd } from '../types/category';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient, private userService: UserService) { }

  getCategories(): Observable<Category[]> {
    let url = `/api/categories`;
    // if (limit) {
    //   url += `?limit=${limit}`;
    // }

    return this.http.get<Category[]>(url);
  }
  
  addCategory(category: CategoryAdd): Observable<number> {
    const currentUser = this.userService.user?.username;
    if (!currentUser) {
      throw new Error('User is not logged in');
    }

    const categoryWithUser = { ...category, username: currentUser };

    console.log(categoryWithUser);
    
    return this.http.post<number>(`/api/categories/add`, categoryWithUser);
  }
}
