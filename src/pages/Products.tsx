import React, { useState } from "react";
import { mockProducts } from "../utils/mockData";
import { useCart } from "../context/CartContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import type { Product } from "@/utils/types";

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // holds the clicked product

  const productsPerPage = 6;
  const { addToCart } = useCart();

  const categories = ["All", ...Array.from(new Set(mockProducts.map((p) => p.category)))];

  const filteredProducts = mockProducts.filter((product) => {
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

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-2xl backdrop-blur-md">
            <DialogHeader>
              <DialogTitle>{selectedProduct.title}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.title}
                className="aspect-[4/3] w-auto h-auto object.contain rounded-lg"
              />
              <div>
                <p className="text-sm text-gray-500">{selectedProduct.brand}</p>
                <p className="text-lg font-semibold text-blue-600">${selectedProduct.price}</p>
                <p className="mt-2">{selectedProduct.description}</p>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
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

            {/* Reviews */}
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Reviews</h3>
              {selectedProduct.reviews && selectedProduct.reviews.length > 0 ? (
                selectedProduct.reviews.map((review, _id) => (
                  <div key={_id} className="border-b py-2">
                    <p className="text-sm font-semibold">{review.user}</p>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Products;

