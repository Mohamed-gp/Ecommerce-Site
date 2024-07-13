interface Product {
  _id: string;
  name: string;
  price: number;
  promoPercentage: number;
  category: object;
  description: string;
  images: string[];
  comments: object[];
}

export type { Product };
