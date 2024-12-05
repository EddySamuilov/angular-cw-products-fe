export interface Category {
  id: string;
  type: CategoryType;
  description: string;
  imageUrl: string;
}

export enum CategoryType {
  ELECTRONICS,
  CLOTHES,
  BOOKS,
  FOOD,
  FURNITURE,
  OTHER,
}

export const Categories = [ // TODO: update when the category service logic is implemented
  { id: 0, type: 'ELECTRONICS', description: 'Electronic gadgets and devices' },
  { id: 1, type: 'CLOTHES', description: 'Brand new clothes' },
  { id: 2, type: 'BOOKS', description: 'Books and educational materials' },
  { id: 3, type: 'FOOD', description: 'The most delicious food' },
  { id: 4, type: 'FURNITURE', description: 'Luxury furniture for everyone' },
  { id: 5, type: 'OTHER', description: 'All the other stuff' },
];