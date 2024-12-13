import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ProductService } from './product.service';
import { ElapsedTimePipe } from '../shared/pipes/elapsed-time.pipe';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoaderComponent } from '../shared/loader/loader.component';
import { FilterComponent } from '../shared/filter/filter.component';
import { DEFAULT_ITEMS_PER_PAGE } from '../constants/constants';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, ElapsedTimePipe, DatePipe, LoaderComponent, TitleCasePipe, FilterComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  isLoading = true;

  products: Product[] = [];
  filteredProducts: Product[] = [];

  currentPage!: number;
  totalPages!: number;

  get isFirstPage() {
    return this.currentPage === 0;
  }

  get isLastPage() {
    return this.currentPage === this.totalPages - 1;
  }

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = 0;
      this.fetchProducts();
    });
  }
  
  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchProducts();
  }

  private fetchProducts() {
    const categoryId = this.route.snapshot.queryParams['categoryId'];
    this.isLoading = true;
  
    this.productService.getProducts(categoryId || null, DEFAULT_ITEMS_PER_PAGE, this.currentPage).subscribe((response) => {
      this.products = response.content;
      this.filteredProducts = response.content;
      this.totalPages = response.totalPages;
      this.isLoading = false;
    });
  }

  onFilterUpdated(filterCriteria: string): void {
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(filterCriteria.toLowerCase())
    );
  }
}
