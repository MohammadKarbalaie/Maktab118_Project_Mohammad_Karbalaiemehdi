// /* eslint-disable @next/next/no-img-element */
// import { getCategories } from "../../../adminserver/services/category-services";
// import { notFound } from "next/navigation";
// import axios from "axios";
// import { Product } from "../../..//type/Product";
// import Pagination from "./Pagination"; // Adjust the import path as necessary
// import Link from "next/link";
// import { BiBasket } from "react-icons/bi";

// export const getProductsByCategoryId = async (
//   categoryId: string,
//   page: number,
//   limit: number
// ) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:8000/api/products?category=${categoryId}`,
//       { params: { page, limit } }
//     );
    
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch products for category:", error);
//     return { products: [], total_pages: 0 };
//   }
// };

// export async function generateStaticParams() {
//   try {
//     const response = await getCategories();
//     const categories = response.data.categories;

//     return categories.map((category: { slugname: string }) => ({
//       slugname: category.slugname,
//     }));
//   } catch (error) {
//     console.error("Failed to fetch categories for paths:", error);
//     return [];
//   }
// }

// export async function getCategoryData(slugname: string) {
//   try {
//     const response = await getCategories();
//     const categories = response.data.categories;
//     const category = categories.find(
//       (cat: { slugname: string }) => cat.slugname === slugname
//     );

//     return category || null;
//   } catch (error) {
//     console.error("Failed to fetch category data:", error);
//     return null;
//   }
// }

// export async function getCategoryProducts(categoryId: string, page: number) {
//   const response = await getProductsByCategoryId(categoryId, page, 3);
//   return {
//     products: response.data.products || [],
//     total_pages: response.total_pages || 0,
//   };
// }

// const Page = async ({
//   params,
//   searchParams,
// }: {
//   params: { slugname: string };
//   searchParams: { page?: string };
// }) => {
//   const category = await getCategoryData(params.slugname);

//   if (!category || !category._id) {
//     notFound();
//   }

//   const currentPage = parseInt(searchParams.page || "1", 10);
//   const { products, total_pages } = await getCategoryProducts(
//     category._id,
//     currentPage
//   );

//   return (
//     <div className="h-full mt-6">
//       <div>
//         <h2>محصولات این دسته بندی:</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//           {products.map((product: Product) => (
//             <Link
//               href={`/Shop/product/${product._id}`}
//               key={product._id}
//               className="max-w-[500px] mx-auto border p-4 rounded-xl"
//             >
//               <h1 className="pt-6 pr-6">دسته بندی:{product.name}</h1>

//               <img
//                 src={`http://localhost:8000/images/products/images/${product.images[0]}`}
//                 alt="Product img"
//                 width={500} // عرض تصویر
//                 height={500} // ارتفاع تصویر
//                 className="rounded p-8"
//               />
//              <div className="bg-gray-50">
//              <h3 className="text-lg font-semibold">{product.name}</h3>
//               <div className="flex justify-between">
//               <p className="text-xl font-bold mt-2">
//                 قیمت: {product.price} تومان
//               </p>
//               <BiBasket className="text-2xl"/>
//               </div>
//              </div>
//             </Link>
//           ))}
//         </div>
//         <Pagination currentPage={currentPage} totalPages={total_pages} />
//       </div>
//     </div>
//   );
// };

// export default Page;

import React from 'react'
import ProductSidebar from './ProductSidebar'

function page() {
  return (
    <div className='my-7 h-[47vh]'> 
      <ProductSidebar />
    </div>
  )
}

export default page