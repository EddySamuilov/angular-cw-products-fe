import { Category } from "./category";

export interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: Category;
  created: string;
  modified: string;
}
