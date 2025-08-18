import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { mockProducts } from "../utils/mockData";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import type { Product as ImportedProduct, Product } from "@/utils/types";
import Fuse from "fuse.js";

/* ------------------------------------------------------------------ */
/* Corrected Types */
/* ------------------------------------------------------------------ */
type Review = { star: number; comment: string; postedBy: string; id?: string };

type ProductWithExtras = Omit<ImportedProduct, "reviews" | "ratings"> & {
  _id?: string;
  images?: string[];
  reviews?: Review[];
  ratings?: number; // numeric rating average
  dealEndsAt?: string;
  isOnSale?: boolean;
  discountPercentage?: number;
  isBestSeller?: boolean;
  isExclusive?: boolean;
  title?: string;
  brand?: string;
  price?: number;
  description?: string;
};

/* ------------------------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------------------------ */
const formatPrice = (p = 0) => `$${p.toFixed(2)}`;

function useCountdown(targetIso?: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!targetIso) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [targetIso]);

  if (!targetIso) return null;
  const diff = Math.max(0, new Date(targetIso).getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { diff, days, hours, minutes, seconds };
}

/* ------------------------------------------------------------------ */
/* Hero With Deal Countdown + Glow Animation */
/* ------------------------------------------------------------------ */
const HeroWithDealCountdown: React.FC<{
  product: ProductWithExtras;
  onAdd: (p: ProductWithExtras) => void;
}> = ({ product, onAdd }) => {
  const cd = useCountdown(product.dealEndsAt);

  return (
    <section className="relative w-full min-h-[70vh] lg:min-h-[80vh] flex items-center">
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-indigo-700/40" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-white">
        <h1
          className="font-extrabold leading-tight animate-glow-once"
          style={{ fontSize: "clamp(1.75rem, 5.5vw, 3.5rem)" }}
        >
          Deal of the Week
        </h1>
        <p className="mt-3 max-w-2xl text-lg lg:text-xl text-gray-100/90">
          {product.title} —{" "}
          <span className="font-bold">{formatPrice(product.price ?? 0)}</span>{" "}
          <Badge variant="destructive">
            -{product.discountPercentage ?? 0}%
          </Badge>
        </p>

        {cd && (
          <div className="mt-4 flex gap-4 text-lg font-semibold">
            <span>{cd.days}d</span>:<span>{cd.hours}h</span>:
            <span>{cd.minutes}m</span>:<span>{cd.seconds}s</span>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <Button
            size="lg"
            className="w-full bg-white text-black font-semibold hover:bg-white border border-black/20 transform transition-transform hover:scale-105"
            onClick={() => onAdd(product)}
          >
            Add to Cart
          </Button>
          <Link to="/products">
            <Button size="lg"
            className="w-full bg-black text-white font-semibold hover:bg-gray-900 border border-white/20 transform transition-transform hover:scale-105">
              View all products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};


/* ----------------------------- ReviewList ----------------------------- */
const ReviewList: React.FC<{ reviews?: Review[] }> = ({ reviews }) => {
  if (!Array.isArray(reviews) || reviews.length === 0) return null;
  return (
    <div className="mt-3 space-y-2">
      {reviews.map((review, idx) => (
        <div key={review.id ?? idx} className="text-xs border-t pt-1">
          <p>⭐ {review.star ?? "N/A"}</p>
          <p className="truncate">{review.comment}</p>
          <small className="text-muted">by {String(review.postedBy ?? "")}</small>
        </div>
      ))}
    </div>
  );
};

/* ----------------------------- ProductCard ----------------------------- */
const ProductCard: React.FC<{
  product: ProductWithExtras;
  onQuickView: (p: ProductWithExtras) => void;
  onAdd: (p: ProductWithExtras) => void;
}> = ({ product, onQuickView, onAdd }) => {
  const isSale = !!product.isOnSale;
  return (
    <Card className="group relative hover:shadow-2xl transition-shadow flex flex-col">
      <div className="relative">
        <AspectRatio ratio={4 / 3}>
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="w-full h-full object-cover rounded-t-md"
          />
        </AspectRatio>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isBestSeller && <Badge>Best Seller</Badge>}
          {product.isExclusive && <Badge>Exclusive</Badge>}
          {isSale && (
            <Badge variant="destructive">-{product.discountPercentage}%</Badge>
          )}
        </div>

        {/* Hover actions */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/90 backdrop-blur rounded-full px-2 py-1 flex gap-2">
            <Button size="sm" onClick={() => onAdd(product)}>
              Add
            </Button>
            <Button size="sm" variant="outline" onClick={() => onQuickView(product)}>
              Quick view
            </Button>
          </div>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-sm line-clamp-1">{product.title}</CardTitle>
        <CardDescription className="text-xs">{product.brand}</CardDescription>
      </CardHeader>

      <CardContent className="mt-auto">
        <div className="flex items-center justify-between">
          <span className="font-bold">{formatPrice(product.price ?? 0)}</span>
          {typeof product.ratings === "number" && (
            <span className="text-xs">⭐ {product.ratings}</span>
          )}
        </div>

        <ReviewList reviews={product.reviews} />
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
      </CardContent>
    </Card>
  );
};

/* ----------------------------- ProductCarousel ----------------------------- */
const ProductCarousel: React.FC<{
  title?: string;
  products: ProductWithExtras[];
  isLoading?: boolean;
  onQuickView: (p: ProductWithExtras) => void;
  onAdd: (p: ProductWithExtras) => void;
}> = ({ title, products, isLoading, onQuickView, onAdd }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const scroll = (dir: number) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir * ref.current.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section className="w-full">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="hidden md:flex gap-2">
            <Button size="sm" onClick={() => scroll(-1)}>&larr;</Button>
            <Button size="sm" onClick={() => scroll(1)}>&rarr;</Button>
          </div>
        </div>
      )}
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-64 flex-shrink-0">
                <div className="animate-pulse p-3">
                  <div className="w-full h-48 bg-gray-200 rounded-md mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))
          : products.map((p) => (
              <div key={p._id ?? p.title ?? Math.random()} className="w-64 flex-shrink-0 snap-start">
                <ProductCard product={p} onQuickView={onQuickView} onAdd={onAdd} />
              </div>
            ))}
      </div>
    </section>
  );
};

/* ----------------------------- DealCard ----------------------------- */
const DealCard: React.FC<{
  product: ProductWithExtras;
  onQuickView: (p: ProductWithExtras) => void;
  onAdd: (p: ProductWithExtras) => void;
}> = ({ product, onQuickView, onAdd }) => {
  const cd = useCountdown(product.dealEndsAt);
  return (
    <Card className="flex flex-col">
      <AspectRatio ratio={4 / 3}>
        <img src={product.images?.[0]} alt={product.title} className="w-full h-full object-cover" />
      </AspectRatio>
      <CardContent>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{product.title}</h4>
          <span className="font-bold">{formatPrice(product.price ?? 0)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <Badge variant="destructive">-{product.discountPercentage ?? 0}%</Badge>
          {cd && (
            <div className="text-xs">{cd.days}d {cd.hours}h {cd.minutes}m</div>
          )}
        </div>
        <div className="mt-3 flex gap-2">
          <Button onClick={() => onAdd(product)}>Add to cart</Button>
          <Button variant="outline" onClick={() => onQuickView(product)}>Quick view</Button>
        </div>
      </CardContent>
    </Card>
  );
};


/* ----------------------------- QuickViewModal ----------------------------- */
const QuickViewModal: React.FC<{
  product?: ProductWithExtras;
  onClose: () => void;
  onAdd: (p: ProductWithExtras) => void;
}> = ({ product, onClose, onAdd }) => {
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl bg-white rounded-lg overflow-hidden">
        <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-64 object-cover rounded"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-bold">{product.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{product.brand}</p>
            <div className="mt-4">
              <span className="text-2xl font-extrabold">
                {formatPrice(product.price ?? 0)}
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-700 line-clamp-4">
              {product.description}
            </p>
            <ReviewList reviews={product.reviews} />
            <div className="mt-6 flex gap-3">
              <Button
                onClick={() => {
                  onAdd(product);
                  onClose();
                }}
              >
                Add to cart
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------- Home Component ----------------------------- */
const Home: React.FC = () => {
  const { addToCart } = useCart();
  const [query] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [quick, setQuick] = useState<ProductWithExtras | undefined>();

  // prepare typed product arrays
  const allProducts = useMemo(
    () => mockProducts as unknown as ProductWithExtras[],
    []
  );

  const trending = useMemo(() => allProducts.slice(0, 10), [allProducts]);
  const newArrivals = useMemo(
    () => allProducts.slice().reverse().slice(0, 8),
    [allProducts]
  );
  const deals = useMemo(
    () => allProducts.filter((p) => p.isOnSale).slice(0, 8),
    [allProducts]
  );
  const featured = useMemo(
    () => allProducts.slice(3, 12),
    [allProducts]
  );

  // live search with Fuse
  const fuse = useMemo(
    () =>
      new Fuse(allProducts, {
        keys: ["title", "brand", "category", "description"],
        threshold: 0.35,
      }),
    [allProducts]
  );

  const searchResults = useMemo(() => {
    if (!query) return allProducts;
    return fuse.search(query).map((r) => r.item);
  }, [query, allProducts, fuse]);

  // loading simulation
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <main className="flex flex-col gap-12 p-4 lg:p-8">
      {deals.length > 0 && (
        <HeroWithDealCountdown product={deals[0]} onAdd={(p) =>addToCart(p as unknown as Product)} />
      )}

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-12">
        {/* Trending */}
        <ProductCarousel
          title="Trending Now"
          products={trending}
          isLoading={isLoading}
          onQuickView={(p) => setQuick(p)}
          onAdd={(p) =>addToCart(p as unknown as Product)}
        />

        {/* New Arrivals */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">New Arrivals</h3>
            <Link to="/products">View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse p-3">
                    <div className="w-full h-48 bg-gray-200 rounded-md mb-3" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                ))
              : newArrivals.map((p) => (
                  <ProductCard
                    key={p._id ?? p.title ?? Math.random()}
                    product={p}
                    onQuickView={setQuick}
                    onAdd={(p) =>addToCart(p as unknown as Product)}
                  />
                ))}
          </div>
        </section>

        {/* Deals of the Week */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Deals of the Week</h3>
            <div className="text-sm text-gray-600">
              Limited time — grab them while they last
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deals.map((p) => (
              <DealCard
                key={p._id ?? p.title ?? Math.random()}
                product={p}
                onQuickView={setQuick}
                onAdd={(p) =>addToCart(p as unknown as Product)}
              />
            ))}
          </div>
        </section>

        {/* Featured */}
        <ProductCarousel
          title="Featured products"
          products={featured}
          isLoading={isLoading}
          onQuickView={setQuick}
          onAdd={(p) =>addToCart(p as unknown as Product)}
        />

        {/* Live Search Results */}
        {query && (
          <section>
            <h3 className="text-lg font-semibold mb-3">
              Search results for “{query}”
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(isLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="animate-pulse p-3">
                      <div className="w-full h-48 bg-gray-200 rounded-md mb-3" />
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  ))
                : searchResults.slice(0, 8).map((p) => (
                    <ProductCard
                      key={p._id ?? p.title ?? Math.random()}
                      product={p}
                      onQuickView={setQuick}
                     onAdd={(p) =>addToCart(p as unknown as Product)}
                    />
                  )))}
            </div>
          </section>
        )}
      </div>

      {/* Quick view modal */}
      <QuickViewModal
        product={quick}
        onClose={() => setQuick(undefined)}
        onAdd={(p) =>addToCart(p as unknown as Product)}
      />
    </main>
  );
};

export default Home;
