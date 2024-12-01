import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ProductService } from '../product/product.service';
import { Category } from '../types/category';
import { CategoryService } from '../category/category.service';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '../pipes/slice.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SlicePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  isLoading = true;

  constructor(
    private productService: ProductService,
    private categortService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      console.log(products);

      this.isLoading = false;
      this.products = products;
    });

    this.categortService.getCategories().subscribe((categories) => {
      this.isLoading = false;
      this.categories = categories;
    })
  }
}
