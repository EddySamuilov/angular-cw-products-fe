import { Category } from "./category";
import { Post } from "./post";

export interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: Category;
  created: string;
  modified: string;
  createdBy: string;
  posts: Post[];
}

export interface ProductUpsert {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  categoryId: number;
  created: string;
  modified: string;
}

export interface ProductAdd {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  categoryType: string;
}

export interface ProductPagedDTO {
  content: Product[],
  page: number,
  totalItems: number,
  totalPages: number,
}