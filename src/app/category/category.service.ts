import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, CategoryAdd } from '../types/category';
import { UserService } from '../user/user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  getCategories(): Observable<Category[]> {
    let url = `/api/categories`;
    return this.http.get<Category[]>(url);
  }

  addCategory(category: CategoryAdd): Observable<number> {
    const currentUser = this.userService.user?.username;
    if (!currentUser) {
      this.toastrService.error('User is not logged in', 'Failure');
    }

    const categoryWithUser = { ...category, username: currentUser };
    return this.http.post<number>(`/api/categories/add`, categoryWithUser);
  }
}
