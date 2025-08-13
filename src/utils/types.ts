import type { ReactNode } from "react";

export interface Product {
  dealEndsAt?: string | undefined;
  isExclusive?: boolean;
  isBestSeller?: boolean;
   _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  color?: string;
  stock: number;
  images: string[];
  reviews: Review[]; // <-- Added this
  ratings?: {
    star: number;
    comment: string;
    postedBy: string;
  }[],
  totalrating: number;
  isOnSale?: boolean;
  discountPercentage?: number;
  featured?: boolean;
  newArrival?: boolean;
};
export interface Review {
    postedBy?: ReactNode;
    user: string;
    comment: string;
    stars: number;
}