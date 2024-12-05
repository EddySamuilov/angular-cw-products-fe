import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ProductService } from './product.service';
import { ElapsedTimePipe } from '../shared/pipes/elapsed-time.pipe';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, ElapsedTimePipe, DatePipe, LoaderComponent, TitleCasePipe],
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
          this.isLoading = false;
        });
      } else {
        this.productService.getProducts(null).subscribe((products) => {
          this.products = products;
          this.isLoading = false;
        });
      }
    });
  }
}
