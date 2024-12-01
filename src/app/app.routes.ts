import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', children: [
    { path: '', component: ProductComponent },
    { path: ':productId', component: ProductDetailsComponent },
  ]},
  { path: 'categories', component: CategoryComponent },
];
