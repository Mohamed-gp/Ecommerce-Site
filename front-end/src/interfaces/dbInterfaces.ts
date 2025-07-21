interface Product {
  _id: string;
  name: string;
  price: number;
  promoPercentage: number;
  category: Category;
  description: string;
  images: string[];
  comments: Comment[];
  isFeatured?: boolean;
  isNew?: boolean;
}

interface Category {
  name: string;
  _id: string;
}

interface Comment {
  _id: string;
  rate: number;
  content: string;
  user: {
    _id: string;
    username: string;
    photoUrl?: string;
  };
  createdAt: string;
}

interface Coupon {
  _id: string;
  code: string;
  discount: number;
  expiresAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type { Product, Category, Comment, Coupon };
