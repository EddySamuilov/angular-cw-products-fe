import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ProductService } from './product.service';
import { ElapsedTimePipe } from '../pipes/elapsed-time.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ElapsedTimePipe, DatePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      console.log(products);
      
      this.isLoading = false;
      this.products = products;
    })
  }
}
