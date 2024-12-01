import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { DatePipe, SlicePipe } from '@angular/common';
import { ElapsedTimePipe } from '../../pipes/elapsed-time.pipe';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [DatePipe, ElapsedTimePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.params['productId'];
    this.productService.getSingleProduct(productId).subscribe((product) => {
      this.product = product;
    })
  }

}
