import { Component, OnInit } from '@angular/core';
import { Product, ProductUpsert } from '../../types/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { DatePipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { ElapsedTimePipe } from '../../shared/pipes/elapsed-time.pipe';
import { Categories, Category, } from '../../types/category';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ReactiveFormsModule, ElapsedTimePipe, TitleCasePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  isEditMode = false;
  product = {} as Product;
  categories = Categories;

  editForm = new FormGroup({
    id: new FormControl(this.product.id, [Validators.required]),
    title: new FormControl(this.product.title, [Validators.required]),
    description: new FormControl(this.product.description, [Validators.required, Validators.minLength(5)]),
    imageUrl: new FormControl(this.product.imageUrl),
    price: new FormControl(this.product.price, [Validators.required]),
    category: new FormControl(this.product.category, [Validators.required]),
    created: new FormControl(this.product.created),
    modified: new FormControl(this.product.modified),
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.params['productId'];
    this.productService.getSingleProduct(productId).subscribe((product) => {
      this.product = product;
      this.editForm.setValue(this.product);
    });
  }

  triggerEditMode(event: Event) {
    event.preventDefault()
    this.isEditMode = !this.isEditMode;
  }

  onEditProduct(event: Event): void {
    this.product = this.editForm.value as Product;
    this.productService.updateProduct(this.editForm.value as Product).subscribe((response) => {
      this.product = response;
      this.triggerEditMode(event);
    });
  }

  onDelete(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {});
    this.router.navigate(['/products']);
  }
}
