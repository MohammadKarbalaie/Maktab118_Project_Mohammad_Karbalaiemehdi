/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { getAllProductsReq } from "../../services/product-service";
import { getCategories } from "../../services/category-service"; // افزودن این خط
import { BiBasket } from "react-icons/bi";
import { Product } from "../../types/product";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
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

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data.categories);
    } catch (error) {
      console.error("خطا در دریافت دسته‌بندی‌ها:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "نامشخص";
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
              <div key={product._id} className="max-w-[500px] border-2 py-3 rounded-xl mx-auto group relative">
                <Link href={`/product/${product._id}`} passHref>
                  <div className="w-full overflow-hidden rounded-md">
                    <div className="relative w-full h-[18rem] group-hover:scale-110 transition-all duration-300 rounded-md overflow-hidden">
                      <img
                        src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                        alt={product.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </Link>
                <div className="my-2 space-y-1 p-4">
                  <p className="text-sm text-sky-500 font-light -mb-1 hover:opacity-60 cursor-pointer">
                    {getCategoryName(product.category)}
                  </p>
                  <h3 className="text-xl font-bold capitalize hover:text-green-500">
                    {product.name.slice(0, 45)}
                    {product.name.length > 45 && "..."}
                  </h3>
                  <div className="flex justify-between">
                  <div className="text-lg font-bold space-x-3 flex gap-2">
                    <span className="text-muted-foreground flex gap-1">
                      <p>تومان</p>
                      {product.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="group-hover:block top-[380px] left-8">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-2 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-sm transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-100"
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
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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


// import React from "react";
// import ProductsSection from "../components/Product/ProductSection";

// const ProductsPage = () => {
//   return (
//     <div className="flex">
//       <div className="w-3/4 p-4">
//         <ProductsSection />
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;

