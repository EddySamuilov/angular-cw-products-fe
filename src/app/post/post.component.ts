import { Component, Input, OnInit } from '@angular/core';
import { Post, PostAdd, PostUpdate as PostUpdate } from '../types/post';
import { PostService } from './post.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { Product } from '../types/product';
import { FormsModule, NgForm } from '@angular/forms';
import { AddPostComponent } from "./add-post/add-post.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [LoaderComponent, FormsModule, AddPostComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  @Input({required: true}) product!: Product;

  isLoading = true;
  isCreatePostModeTriggred = false;

  constructor(
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    if (this.product) {
      this.isLoading = false;
    }
  }

  onCreatePostClick(): void {
    this.isCreatePostModeTriggred = true;
  }
  
  onCloseAddPost(): void {
    this.isCreatePostModeTriggred = false;
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

    this.postService.updatePost(postForUpdate as PostUpdate).subscribe((data) => {});
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

    this.postService.updatePost(postForUpdate as PostUpdate).subscribe(() => {});
  }
}
