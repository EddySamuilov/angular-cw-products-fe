export interface Post {
  id: number;
  title: string;
  description: string;
  likes: number;
  dislikes: number;
  productId: number;
  createdBy: string;
  isLiked?: boolean;
  isDisliked?: boolean;
}

export interface PostAdd {
  id: number;
  title: string;
  description: string;
  likes: number;
  dislikes: number;
}