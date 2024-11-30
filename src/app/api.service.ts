import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Product {
  title: string;
  description: string;
  type: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPosts(limit: number) {
    let url = `/api/posts`;
    if (limit) {
      url += `?limit=${limit}`;
    }

    console.log(this.http.get('http://localhost:8080/api/v1/products'));

    return this.http.get('http://localhost:8080/api/v1/products');
  }

  // getThemes() {
  //   let url = `/api/themes`;
  //   return this.http.get<Theme[]>(url);
  // }

  // getSingleTheme(themeId: string) {
  //   let url = `/api/themes/${themeId}`;
  //   return this.http.get<Theme>(url);
  // }

  // createTheme(themeName: string, postText: string) {
  //   const payload = { themeName, postText }
  //   return this.http.post<Theme>(`/api/themes`, payload);
  // }
}
