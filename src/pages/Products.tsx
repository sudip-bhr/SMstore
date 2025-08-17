// Products.tsx
import React, { useEffect, useMemo, useState } from "react";
import Fuse, { type IFuseOptions, type FuseResult } from "fuse.js";
import { Star, ShoppingCart, Eye, Tag, Percent } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "@/context/ProductContext";
import type { Product, Review } from "@/utils/types";


// shadcn/ui (adjust imports if your project structure differs)
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

/* ------------------- Helpers & small components ------------------- */

const formatPrice = (n: number) => n.toLocaleString(undefined, { style: "currency", currency: "USD" });
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const ImageWithFallback: React.FC<{ src?: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [broken, setBroken] = useState(false);
  if (!src || broken) {
    return (
      <div
        role="img"
        aria-label={`${alt} (image unavailable)`}
        className={"flex items-center justify-center bg-gray-100 text-gray-400 text-xs " + (className || "h-48 w-full rounded-md")}
      >
        No image
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setBroken(true)} loading="lazy" />;
};

const Stars: React.FC<{ value: number; size?: number; className?: string }> = ({ value, size = 18, className }) => {
  const rounded = Math.round(value ?? 0);
  return (
    <div className={"flex items-center gap-0.5 " + (className || "")}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={i < rounded ? "text-yellow-500" : "text-gray-300"}
          fill={i < rounded ? "currentColor" : "none"}
          aria-hidden
        />
      ))}
    </div>
  );
};

const SaleBadge: React.FC<{ isOnSale?: boolean; discountPercentage?: number }> = ({ isOnSale, discountPercentage }) => {
  if (!isOnSale || !discountPercentage) return null;
  return (
    <Badge variant="destructive" className="flex items-center gap-1 w-fit">
      <Tag className="w-3 h-3" /> <Percent className="w-3 h-3" /> {discountPercentage}% OFF
    </Badge>
  );
};

// highlightWithIndices expects the exact tuple type Fuse returns: readonly [number, number][]
const highlightWithIndices = (text: string, indices?: readonly [number, number][]) => {
  if (!indices || indices.length === 0) return text;
  const parts: React.ReactNode[] = [];
  let last = 0;
  indices.forEach(([s, e], idx) => {
    if (s < 0 || e < s || s >= text.length) return;
    if (s > last) parts.push(text.slice(last, s));
    parts.push(<mark key={idx} className="bg-yellow-100 rounded px-[2px]">{text.slice(s, e + 1)}</mark>);
    last = e + 1;
  });
  if (last < text.length) parts.push(text.slice(last));
  return parts;
};

/* ------------------- Main Products component ------------------- */

const Products: React.FC = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { currentUser } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Reviews for the modal
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const productsPerPage = 6;

  // debounce searchTerm so Fuse isn't run on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedTerm(searchTerm.trim()), 220);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // categories
  const categories = useMemo(() => ["All", ...Array.from(new Set((products || []).map((p) => p.category)))], [products]);

  // prefilter by category first (smaller dataset for Fuse)
  const prefilteredByCategory = useMemo(() => {
    if (!products) return [];
    return (products || []).filter((p) => selectedCategory === "All" || p.category === selectedCategory);
  }, [products, selectedCategory]);

  // Fuse config — typed as IFuseOptions<Product>
  const fuse = useMemo(() => {
    const normalized = (prefilteredByCategory || []).map(p => ({
    ...p,
    title: p.title || "",
    brand: p.brand || "",
    description: p.description || "",
    category: p.category || "",
  }));

    const options: IFuseOptions<Product> = {
      includeMatches: true,
      includeScore: true,
      shouldSort: true,
      threshold: 0.35, // tweak for sensitivity
      ignoreLocation: true,
      minMatchCharLength: 1,
      keys: [
        { name: "title", weight: 0.6 },
        { name: "brand", weight: 0.4 },
        { name: "description", weight: 0.05 },
        { name: "category", weight: 0.4 },
      ],
    };
    return new Fuse(normalized, options);
  }, [prefilteredByCategory]);

  // run search (or fallback to prefiltered list)
  const { searchedList, matchesMap } = useMemo(() => {
    if (!debouncedTerm) {
      return {
        searchedList: prefilteredByCategory || [],
        // matchesMap maps productId -> array of matches (FuseResult matches)
        matchesMap: {} as Record<string, FuseResult<Product>["matches"]>,
      };
    }

    const results: FuseResult<Product>[] = fuse.search(debouncedTerm, { limit: 1000 });
    const list = results.map((r) => r.item);
    const map: Record<string, FuseResult<Product>["matches"]> = {};
    results.forEach((r) => {
      if (r.item && r.item._id) map[r.item._id] = r.matches || [];
    });
    return { searchedList: list, matchesMap: map };
  }, [fuse, debouncedTerm, prefilteredByCategory]);

  // sorting
  const filteredProducts = useMemo(() => {
    const list = (searchedList || []).slice();
    switch (sort) {
      case "Price: Low to High":
        list.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        list.sort((a, b) => b.price - a.price);
        break;
      case "Rating":
        list.sort((a, b) => (b.totalrating || 0) - (a.totalrating || 0));
        break;
      default:
        // keep Fuse ordering for "Featured"
        break;
    }
    return list;
  }, [searchedList, sort]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));
  const indexOfLastProduct = clamp(currentPage, 1, totalPages) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // keep currentPage valid when results change
  useEffect(() => {
    setCurrentPage((p) => clamp(p, 1, Math.max(1, Math.ceil(filteredProducts.length / productsPerPage))));
  }, [filteredProducts.length]);

  // load reviews for selected product from localStorage
  useEffect(() => {
    if (selectedProduct) {
      const stored = localStorage.getItem(`reviews_${selectedProduct._id}`);
      setReviews(stored ? JSON.parse(stored) : selectedProduct.reviews || []);
      setReviewText("");
      setRating(0);
    }
  }, [selectedProduct]);

  // Add to cart with toast notification
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`, {
      position: 'bottom-right',
      duration: 2000,
    });
  };

  const handleAddReview = () => {
    if (!currentUser) {
      alert("Please login to leave a review.");
      return;
    }
    if (!reviewText.trim() || rating === 0) {
      alert("Please enter rating and review text.");
      return;
    }

    const newReview: Review = {
      user: currentUser.username,
      comment: reviewText,
      stars: rating,
      postedBy: undefined
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    if (selectedProduct) localStorage.setItem(`reviews_${selectedProduct._id}`, JSON.stringify(updatedReviews));
    setReviewText("");
    setRating(0);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>

      {/* Controls */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Input
          placeholder="Search products…"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          aria-label="Search products"
        />

        <Select value={selectedCategory} onValueChange={(v: React.SetStateAction<string>) => { setSelectedCategory(v); setCurrentPage(1); }}>
          <SelectTrigger aria-label="Filter by category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger aria-label="Sort products">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Featured">Featured</SelectItem>
            <SelectItem value="Price: Low to High">Price: Low to High</SelectItem>
            <SelectItem value="Price: High to Low">Price: High to Low</SelectItem>
            <SelectItem value="Rating">Rating</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center justify-end text-sm text-muted-foreground">
          {filteredProducts.length} results
        </div>
      </div>

      {/* Grid */}
      {currentProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentProducts.map((product) => {
              const img = product.images?.[0];
              const outOfStock = (product.stock ?? 0) <= 0;

              // get matches for highlighting from matchesMap
              const matches = matchesMap[product._id] || [];
              // find title match indices (if any)
              const titleMatch = matches.find((m) => m.key === "title");
              const titleIndices = titleMatch?.indices;

              return (
                <Card key={product._id} className="overflow-hidden group">
                  <CardHeader className="p-0 relative">
                    <ImageWithFallback src={img} alt={product.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 left-2 flex gap-2">
                      {product.featured && <Badge>Featured</Badge>}
                      {product.newArrival && <Badge variant="secondary">New</Badge>}
                    </div>
                    <div className="absolute top-2 right-2">
                      <SaleBadge isOnSale={product.isOnSale} discountPercentage={product.discountPercentage} />
                    </div>
                  </CardHeader>

                  <CardContent className="p-4">
                    <h2 className="font-semibold text-base line-clamp-1" title={product.title}>
                      {titleIndices ? highlightWithIndices(product.title, titleIndices) : product.title}
                    </h2>
                    <p className="text-xs text-muted-foreground line-clamp-1">{product.brand}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-lg font-bold text-blue-600">{formatPrice(product.price)}</p>
                      <Stars value={product.totalrating || 0} />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  </CardContent>

                  <CardFooter className="p-4 pt-0 flex items-center gap-2">
                    <Button 
                      onClick={() => {
                        addToCart(product);
                        toast.success(`${product.title} added to cart!`, {
                          style: {
                            backgroundColor: 'darkgreen', // A nice green color
                            color: 'white',
                          },
                          position: 'bottom-right',
                          duration: 2000,
                        });
                      }} 
                      disabled={outOfStock}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {outOfStock ? "Out of stock" : "Add to cart"}
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedProduct(product)} aria-label={`Quick view for ${product.title}`}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button variant="outline" onClick={() => setCurrentPage((p) => clamp(p - 1, 1, totalPages))} disabled={currentPage === 1}>
              Prev
            </Button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button key={i} variant={currentPage === i + 1 ? "default" : "outline"} onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </Button>
            ))}
            <Button variant="outline" onClick={() => setCurrentPage((p) => clamp(p + 1, 1, totalPages))} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </>
      ) : (
        <div className="text-muted-foreground text-center py-16">
          <p className="mb-2">No products found.</p>
          <p className="text-sm">Try removing filters or adjusting your search.</p>
        </div>
      )}

      {/* Quick View / Detail Modal */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedProduct.title}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImageWithFallback
                src={selectedProduct.images?.[0]}
                alt={selectedProduct.title}
                className="w-full h-auto max-h-60 sm:max-h-[400px] object-contain rounded-md"
              />
              <div>
                <p className="text-sm text-muted-foreground">{selectedProduct.brand}</p>
                <p className="text-lg font-semibold text-blue-600">{formatPrice(selectedProduct.price)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Stars value={selectedProduct.totalrating || 0} />
                  <SaleBadge isOnSale={selectedProduct.isOnSale} discountPercentage={selectedProduct.discountPercentage} />
                </div>
                <p className="mt-3 text-sm leading-6">{selectedProduct.description}</p>
                <Button onClick={() => handleAddToCart(selectedProduct)} className="mt-4">
                  <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                </Button>
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>

              {reviews.length > 0 ? (
                <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                  {reviews.map((review, idx) => (
                    <div key={idx} className="border p-4 rounded-lg bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">{review.user}</p>
                        <Stars value={review.stars} size={14} />
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No reviews yet.</p>
              )}

              {/* Add Review */}
              <div className="mt-6">
                {currentUser ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 cursor-pointer ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
                          fill={i < rating ? "currentColor" : "none"}
                          onClick={() => setRating(i + 1)}
                        />
                      ))}
                    </div>
                    <textarea
                      className="w-full min-h-24 border rounded-md p-3 focus:outline-none"
                      placeholder="Write your review…"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                    <Button onClick={handleAddReview}>Submit Review</Button>
                  </div>
                ) : (
                  <p className="text-muted-foreground">You must be logged in to leave a review.</p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Products;






