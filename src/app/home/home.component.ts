import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ProductService } from '../product/product.service';
import { Category } from '../types/category';
import { CategoryService } from '../category/category.service';
import { Router, RouterLink } from '@angular/router';
import { SlicePipe } from '../shared/pipes/slice.pipe';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SlicePipe, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  isLoading = true;

  constructor(
    private productService: ProductService,
    private categortService: CategoryService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.productService.getProducts(null, 5, 1).subscribe((response) => {
      this.isLoading = false;
      this.products = response.content;
    });

    this.categortService.getCategories().subscribe((categories) => {
      this.isLoading = false;
      this.categories = categories;
    })
  }

  onViewCategoryProducts(categoryId: string) {
    this.router.navigate(['/products'], { queryParams: { categoryId } })
  }
}
