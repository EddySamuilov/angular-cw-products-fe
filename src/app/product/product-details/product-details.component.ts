import { Component, OnInit } from '@angular/core';
import { Product, ProductUpsert } from '../../types/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { DatePipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { ElapsedTimePipe } from '../../shared/pipes/elapsed-time.pipe';
import { Categories, Category, } from '../../types/category';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../category/category.service';
import { UserService } from '../../user/user.service';
import { PostComponent } from '../../post/post.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ReactiveFormsModule, ElapsedTimePipe, TitleCasePipe, PostComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  isEditMode = false;
  product = {} as Product;
  categories: Category[] = [];

  editForm = new FormGroup({
    id: new FormControl(this.product.id, [Validators.required]),
    title: new FormControl(this.product.title, [Validators.required]),
    description: new FormControl(this.product.description, [Validators.required, Validators.minLength(5)]),
    imageUrl: new FormControl(this.product.imageUrl),
    price: new FormControl(this.product.price, [Validators.required]),
    category: new FormControl(this.product.category, [Validators.required]),
    created: new FormControl(this.product.created),
    modified: new FormControl(this.product.modified),
    createdBy: new FormControl(this.product.createdBy),
    posts: new FormControl(),
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    })

    const productId = this.activatedRoute.snapshot.params['productId'];
    this.productService.getSingleProduct(productId).subscribe((product) => {
      this.product = product;
      this.editForm.setValue(this.product);
    });
  }

  get isAbleToTriggerEditMode() {
    const createdBy = this.editForm.get('createdBy');
    const currentUser = this.userService.user?.username;
    
    return createdBy?.value === currentUser;
  }

  triggerEditMode(event: Event) {
    event.preventDefault();
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
    this.toastrService.info('Product removed', 'Deleted')
  }
}
