/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { getAllProductsReq } from "../../adminserver/services/products-services";
import { BiBasket } from "react-icons/bi";
import { Product } from "../../type/Product";
import Link from "next/link";
import { useCart } from "../context/CartContext";

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const { addToCart } = useCart();

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const { data, total_pages } = await getAllProductsReq(page, 9);
      setProducts(data.products);
      setTotalPages(total_pages);
    } catch (error) {
      console.error("خطا در دریافت محصولات:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      _id: product._id,
      name: product.name,
      brand: product.brand,
      subcategory: product.subcategory,
      category: product.category,
      price: product.price,
      quantity: 1,
      description: product.description,
      thumbnail: product.thumbnail,
      images: product.images,
    });
  };

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-3xl min-[400px]:text-4xl text-black mb-8 max-lg:text-center">
          همه محصولات
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {loading ? (
            <p>در حال بارگذاری...</p>
          ) : (
            products.map((product) => (
              <div key={product._id} className="max-w-[500px] mx-auto">
                <Link href={`/Shop/product/${product._id}`} passHref>
                  <div className="w-full border rounded-xl max-w-sm aspect-square">
                    <img
                      src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                      alt={product.name}
                      className="w-full py-10 rounded-xl object-fill"
                      width={500}
                      height={300}
                    />
                  </div>
                </Link>
                <div className="mt-5">
                  <div className="flex flex-col ">
                    <div>
                      <h6 className="font-medium text-xl leading-8 text-black mb-2">
                        {product.name}
                      </h6>
                    </div>
                    <div className="flex items-center gap-4 justify-between">
                      <h6 className="font-semibold text-xl leading-8 text-indigo-600">
                        {product.price.toLocaleString()} تومان
                      </h6>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="p-2 min-[400px]:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-100"
                      >
                        <BiBasket className="text-gray-400 text-2xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-center mt-10">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            قبلی
          </button>
          <span className="mx-4">
            صفحه {currentPage} از {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            بعدی
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
