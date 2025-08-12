import React from "react";
import { Link } from "react-router-dom";
import { mockProducts } from "../utils/mockData";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

const Home: React.FC = () => {
  const { addToCart } = useCart();
  const featuredProducts = mockProducts.slice(0, 3);
  const categories = [...new Set(mockProducts.map((p) => p.category))];

  return (
    <main className="flex flex-col gap-12 p-6">
      {/* Hero Section */}
      <Card className="overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-600/80 to-indigo-700/80 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1524289286702-f07229da36f5?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <CardContent className="relative z-20 py-16 px-6 text-center lg:text-left text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Welcome to SM Electronics
          </h1>
          <p className="mb-6 text-lg text-gray-100">
            Discover the latest gadgets and electronics at unbeatable prices.
          </p>
          <Link to="/products">
            <Button variant="secondary" size="lg">
              Shop Now
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product._id}
              className="flex flex-col hover:shadow-xl transition-shadow"
            >
              <AspectRatio ratio={4 / 3}>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </AspectRatio>
              <CardHeader>
                <CardTitle className="line-clamp-1">{product.title}</CardTitle>
                <CardDescription>{product.brand}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 mt-auto">
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold">
                    ${product.price}
                  </span>
                  {product.isOnSale && (
                    <Badge variant="destructive">
                      {product.discountPercentage}% OFF
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={() => addToCart(product)}
                    className="flex-1"
                  >
                    Add to Cart
                  </Button>
                  <Link to="/products" className="flex-1">
                    <Button variant="outline" className="w-full">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat} to={`/products?category=${cat}`}>
              <Button variant="outline" className="w-full">
                {cat}
              </Button>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
