// Data from DB
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrls?: string[];
  category: string;
  stock: number;
}

// For product listing page
export type ProductSummary = {
  id: number;
  name: string;
  price: number;
  imageUrls?: string[];
}

// For Product listing cart page
export type ProductCart = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}