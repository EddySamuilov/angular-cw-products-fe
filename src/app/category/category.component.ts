import { Component } from '@angular/core';
import { Category } from '../types/category';
import { CategoryService } from './category.service';
import { ProductService } from '../product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  categories: Category[] = [];
  isLoading = true;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.isLoading = false;
      this.categories = categories;
    });
  }

  onViewCategoryProducts(categoryId: string) {
    this.router.navigate(['/products'], { queryParams: { categoryId } })
  }
}
