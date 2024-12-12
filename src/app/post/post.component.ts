import { Component, Input, OnInit } from '@angular/core';
import { Post, PostAdd } from '../types/post';
import { PostService } from './post.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { ProductService } from '../product/product.service';
import { Product } from '../types/product';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  isLoading = true;
  @Input({required: true}) product!: Product;

  constructor(
    private postService: PostService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
      this.isLoading = false;
    });
  }

  onLike(postTitle: string): void {
    const postForUpdate = this.product.posts.find((post) => {
      return post.title.toLowerCase() === postTitle.toLowerCase();
    });

    if (!postForUpdate) return;

    if (postForUpdate.isDisliked) {
      postForUpdate.dislikes -= 1;
      postForUpdate.isDisliked = false;
    }

    postForUpdate.likes += 1;
    postForUpdate.isLiked = true;

    this.postService.updatePost(postForUpdate as PostAdd).subscribe((data) => {});
  }
  
  onDislike(postTitle: string): void {
    const postForUpdate = this.product.posts.find((post) => {
      return post.title.toLowerCase() === postTitle.toLowerCase();
    });
    
    if (!postForUpdate) return;

    if (postForUpdate.isLiked) {
      postForUpdate.likes -= 1;
      postForUpdate.isLiked = false;
    }

    postForUpdate.dislikes += 1;
    postForUpdate.isDisliked = true;

    this.postService.updatePost(postForUpdate as PostAdd).subscribe((data) => {
      
    });
  }
}
