export interface Category {
  id: string;
  type: CategoryTypes;
  description: string;
  imageUrl: string;
}

export enum CategoryTypes {
  ELECTRONICS,
  CLOTHES,
  BOOKS,
  FOOD,
  FURNITURE,
  OTHER,
}

export const Categories = [ // TODO: update when the category service logic is implemented
  { id: 1, type: 'ELECTRONICS', description: 'Electronic gadgets and devices' },
  { id: 2, type: 'CLOTHES', description: 'Brand new clothes' },
  { id: 3, type: 'BOOKS', description: 'Books and educational materials' },
  { id: 4, type: 'FOOD', description: 'The most delicious food' },
  { id: 5, type: 'FURNITURE', description: 'Luxury furniture for everyone' },
  { id: 6, type: 'OTHER', description: 'All the other stuff' },
];