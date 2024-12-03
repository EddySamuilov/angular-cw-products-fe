import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ProductService } from './product.service';
import { ElapsedTimePipe } from '../shared/pipes/elapsed-time.pipe';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, ElapsedTimePipe, DatePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const categoryId = params['categoryId'];
      if (categoryId) {
        this.productService.getProducts(categoryId).subscribe((products) => {
          this.products = products;
        });
      } else {
        this.productService.getProducts(null).subscribe((products) => {
          this.products = products;
        });
      }
      this.isLoading = false;
    });
  }
}
