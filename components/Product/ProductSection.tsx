// "use client"
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../components/Redux/store";
// import { setAllProducts } from "../components/Redux/slices/filterSlice";
// import { getAllProductsReq } from "../../adminserver/services/products-services";

// const ProductsSection = () => {
//   const dispatch = useDispatch();
//   const { allProducts, categories, priceRange } = useSelector(
//     (state: RootState) => state.filter
//   );

//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 9;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const response = await getAllProductsReq();
//       dispatch(setAllProducts(response.data.products));
//     };

//     fetchProducts();
//   }, [dispatch]);

//   // اعمال فیلتر‌ها
//   const filteredProducts = allProducts.filter((product) => {
//     const categoryMatch =
//       categories.length === 0 || categories.includes(product.category);
//     const priceMatch =
//       product.price >= priceRange[0] && product.price <= priceRange[1];

//     return categoryMatch && priceMatch;
//   });

//   // صفحه‌بندی
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   return (
//     <div>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {currentProducts.map((product) => (
//           <div key={product._id} className="border p-4 rounded-lg shadow-sm">
//             <h3 className="text-xl font-bold">{product.name}</h3>
//             <p>قیمت: {product.price.toLocaleString()} تومان</p>
//           </div>
//         ))}
//       </div>

//       {/* صفحه‌بندی */}
//       <div className="flex justify-center items-center mt-10 space-x-4">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           قبلی
//         </button>
//         <span>
//           صفحه {currentPage} از {totalPages}
//         </span>
//         <button
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//         >
//           بعدی
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductsSection;
