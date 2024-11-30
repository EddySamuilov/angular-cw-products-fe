import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
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
