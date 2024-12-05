import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent), canActivate: [authGuard] },
  { path: 'products', children: [
    { 
      path: '',
      loadComponent: () => import('./product/product.component').then((c) => c.ProductComponent),
      canActivate: [authGuard] 
    },
    { 
      path: ':productId',
      loadComponent: () => import('./product/product-details/product-details.component').then((c) => c.ProductDetailsComponent),
      canActivate: [authGuard]
    },
  ]},
  { 
    path: 'categories',
    loadComponent: () => import('./category/category.component').then((c) => c.CategoryComponent),
    canActivate: [authGuard] 
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', loadComponent: () => import('./user/register/register.component').then((c) => c.RegisterComponent), },
];
