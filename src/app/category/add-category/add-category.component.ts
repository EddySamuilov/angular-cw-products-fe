import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { CategoryAdd } from '../../types/category';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  addForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
    imageUrl: new FormControl(''),
  })

  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) {}

  onAddCategory(): void {
    if (this.addForm.invalid) {
      return;
    }

    this.categoryService.addCategory(this.addForm.value as CategoryAdd).subscribe({
      next: (categoryId) => {
        this.router.navigate(['/categories']);
      },
      error: (err) => { 
        console.log(err);
      }
    });
  }
}
