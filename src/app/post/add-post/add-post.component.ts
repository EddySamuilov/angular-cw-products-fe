import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PostAdd } from '../../types/post';
import { PostService } from '../post.service';
import { Product } from '../../types/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  @Input({required: true}) product!: Product;
  @Output() closeAddPost = new EventEmitter<void>();
  
  newPost: PostAdd = {
    title: '',
    description: '',
    likes: 0,
    dislikes: 0,
    productId: 0,
  };

  constructor(
    private postService: PostService,
    private toastrService: ToastrService,
  ) {}

  onAddPost(createPostForm: NgForm) {
    if(createPostForm.invalid) {
      return;
    }

    this.newPost.productId = this.product.id;
    this.postService.addPost(this.newPost).subscribe({
      next: (newPost) => {
        this.product.posts.push(newPost);
        this.closeAddPost.emit();
      },
      error: (err) => {
        this.toastrService.error('Something went wrong!', err.error);
      },
      complete: () => {
        this.toastrService.success('Post added!', 'Success');
        createPostForm.reset();
      }
    });
  }
}
