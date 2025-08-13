import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { mockProducts } from "@/utils/mockData";
import type { Product, Review } from "@/utils/types";

interface ProductContextType {
  products: Product[];
  addReview: (productId: string, review: Review) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    // Load from localStorage or fallback to mockProducts
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : mockProducts;
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addReview = (productId: string, review: Review) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === productId
          ? { 
              ...p, 
              reviews: [...(p.reviews || []), review],
              // Optional: update totalrating based on new reviews
              totalrating: calculateAverageRating([... (p.reviews || []), review])
            }
          : p
      )
    );
  };

  // Helper to calculate average rating
  const calculateAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.stars, 0);
    return Math.round((total / reviews.length) * 10) / 10; // rounded to 1 decimal
  };

  return (
    <ProductContext.Provider value={{ products, addReview }}>
      {children}
    </ProductContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

