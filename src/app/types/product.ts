import { Category } from "./category";

export interface Product {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: Category;
  created: string;
  modified: string;
}
