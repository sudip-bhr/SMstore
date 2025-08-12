import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { mockProducts } from "@/utils/mockData";
import type { Product, Review } from "@/utils/types"; // make sure this has reviews: Review[]
 // make sure this has reviews: Review[]

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find((p) => p._id === id) as Product | undefined;
  const { addToCart } = useCart();
  const { currentUser } = useAuth();

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  if (!product) {
    return <p className="p-6">Product not found.</p>;
  }

  const handleAddReview = () => {
    if (!currentUser) return;
    if (!reviewText.trim()) return;

    const newReview: Review = {
      user: currentUser.username,
      comment: reviewText,
      stars: rating,
    };

    product.reviews.push(newReview); // modify only this product
    setReviewText("");
    setRating(0);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-500 mb-4">
            {product.brand} • {product.category}
          </p>
          <p className="text-2xl font-semibold text-blue-600 mb-4">
            ${product.price}
          </p>

          {product.isOnSale && (
            <p className="text-red-500 font-semibold mb-4">
              {product.discountPercentage}% OFF
            </p>
          )}

          <p className="mb-6">{product.description}</p>

          <Button onClick={() => addToCart(product)} className="mb-6">
            Add to Cart
          </Button>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < product.totalrating
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                fill={i < product.totalrating ? "currentColor" : "none"}
              />
            ))}
            <span className="ml-2 text-gray-600">
              ({product.totalrating} / 5)
            </span>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

        {product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-sm bg-white"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">{review.user}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.stars
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        fill={i < review.stars ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {/* Add Review Form */}
        <div className="mt-6">
          {currentUser ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 cursor-pointer ${
                      i < rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    fill={i < rating ? "currentColor" : "none"}
                    onClick={() => setRating(i + 1)}
                  />
                ))}
              </div>
              <Textarea
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button onClick={handleAddReview}>Submit Review</Button>
            </div>
          ) : (
            <p className="text-gray-500">
              You must be logged in to leave a review.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;





