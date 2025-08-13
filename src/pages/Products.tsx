import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // For user login status
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import type { Product, Review } from "@/utils/types";
import { useProducts } from "@/context/ProductContext";

const Products: React.FC = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // For reviews of currently selected product
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const productsPerPage = 5;

  // Filter categories from products
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Load reviews from localStorage or product on modal open
  useEffect(() => {
    if (selectedProduct) {
      const stored = localStorage.getItem(`reviews_${selectedProduct._id}`);
      setReviews(stored ? JSON.parse(stored) : selectedProduct.reviews || []);
      setReviewText("");
      setRating(0);
    }
  }, [selectedProduct]);

  const handleAddReview = () => {
    if (!currentUser) return alert("Please login to leave a review.");
    if (!reviewText.trim() || rating === 0) return alert("Please enter rating and review text.");

    const newReview: Review = {
      user: currentUser.username,
      comment: reviewText,
      stars: rating,
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${selectedProduct!._id}`, JSON.stringify(updatedReviews));

    setReviewText("");
    setRating(0);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg px-4 py-2 w-full sm:w-1/2 focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg px-4 py-2 w-full sm:w-1/4 focus:ring-2 focus:ring-blue-400"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      {currentProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4 bg-white flex flex-col cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="text-lg font-semibold mt-3 line-clamp-1">{product.title}</h2>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="mt-2 text-blue-600 font-bold">${product.price}</p>
                {product.isOnSale && (
                  <span className="text-red-500 text-sm font-semibold">
                    {product.discountPercentage}% OFF
                  </span>
                )}
                <p className="text-sm mt-2 text-gray-600 line-clamp-2">{product.description}</p>
                <p className="mt-2 text-yellow-500">⭐ {product.totalrating} / 5</p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1 ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}

      {/* Product Detail Modal with Reviews and Add Review Form */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto backdrop-blur-md p-4 sm:p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle>{selectedProduct.title}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.title}
                className="w-full h-auto max-h-60 sm:max-h-[400px] object-contain rounded-lg mx-auto"
              />
              <div>
                <p className="text-sm text-gray-500">{selectedProduct.brand}</p>
                <p className="text-lg font-semibold text-blue-600">${selectedProduct.price}</p>
                <p className="mt-2">{selectedProduct.description}</p>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 sm:w-5 sm:h-5 ${
                        i < selectedProduct.totalrating ? "text-yellow-500" : "text-gray-300"
                      }`}
                      fill={i < selectedProduct.totalrating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <Button onClick={() => addToCart(selectedProduct)} className="mt-4">
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="mt-8 max-h-48 sm:max-h-72 overflow-y-auto space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

              {reviews.length > 0 ? (
                <div className="space-y-4 max-h-72 overflow-y-auto">
                  {reviews.map((review, idx) => (
                    <div
                      key={idx}
                      className="border p-4 rounded-lg shadow-sm bg-white"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">{review.user}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.stars ? "text-yellow-500" : "text-gray-300"
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
              <div className="mt-6" >
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
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Products;



