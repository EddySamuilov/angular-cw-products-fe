import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../types/post';
import { PostService } from './post.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { ProductService } from '../product/product.service';

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
  @Input({required: true}) productId!: number;

  constructor(
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
      this.isLoading = false;
    });
  }

  onLike(post: Post): void {
    post.likes++;
  }
  
  onDislike(post: Post): void {
    post.dislikes++;
  }
}
