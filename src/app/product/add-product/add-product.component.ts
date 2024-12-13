import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories, Category, CategoryType } from '../../types/category';
import { Product, ProductAdd } from '../../types/product';
import { ProductService } from '../product.service';
import { CategoryService } from '../../category/category.service';
import { priceValidator } from '../../utils/price.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  categories: Category[] = [];
  categoryTypes: CategoryType[] = [];

  addForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
    imageUrl: new FormControl(''),
    price: new FormControl(0, [Validators.required, priceValidator()]),
    categoryType: new FormControl('', [Validators.required]),
  })

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.categoryTypes = Array.from(new Set(categories.map((cat) => cat.type)));
      }
    })
  }

  onAddProduct(): void {
    if (this.addForm.invalid) {
      return;
    }
    
    this.productService.addProduct(this.addForm.value as ProductAdd).subscribe({
      next: (data) => {
        this.router.navigate(['/products', data]);
      },
      error: (err) => {
        this.toastrService.error('Something went wrong!', err.error);
      },
      complete: () => {
        this.toastrService.success('Product added!', 'Success');
      }
    });
  }
}
