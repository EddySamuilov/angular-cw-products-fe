import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { PageNotAllowedComponent } from './errors/page-not-allowed/page-not-allowed.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'home',
    loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent),
    canActivate: [authGuard]
  },
  { path: 'products', children: [
    { 
      path: '',
      loadComponent: () => import('./product/product.component').then((c) => c.ProductComponent),
      canActivate: [authGuard] 
    },
    { 
      path: 'add',
      loadComponent: () => import('./product/add-product/add-product.component').then((c) => c.AddProductComponent),
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
  { 
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard]
  },
  { 
    path: 'register',
    loadComponent: () => import('./user/register/register.component').then((c) => c.RegisterComponent),
    canActivate: [guestGuard]
  },
  { 
    path: 'profile',
    loadComponent: () => import('./user/profile/profile.component').then((c) => c.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'logout',
    loadComponent: () => import('./user/logout/logout.component').then((c) => c.LogoutComponent),
    canActivate: [authGuard],
  },
  {
    path: '404', component: PageNotFoundComponent,  
    // loadComponent: () => import('./errors/page-not-found/page-not-found.component').then((c) => c.PageNotFoundComponent),
    // canActivate: [authGuard],
  },
  { path: 'not-allowed', component: PageNotAllowedComponent },
  { path: '**', redirectTo: '/404' },
];
