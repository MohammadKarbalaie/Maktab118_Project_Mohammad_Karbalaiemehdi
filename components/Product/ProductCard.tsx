/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link";
import React from "react";

interface IProduct {
    rating: {
    rate: number;
    count: number;
    };
    _id: string;
    category: string;
    subcategory: string;
    name: string;
    price: number;
    quantity: number;
    brand: string;
    description: string;
    thumbnail: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
    slugname: string;
    }

interface ProductCardProps {
product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {


const handleAddToCart = (e: React.MouseEvent) => {
e.preventDefault(); 
console.log(`Added ${product.name} to cart!`);
};

return (

<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer min-h-[100vh]">
<div className="relative h-48">
    
<Link href={`/Shop/product/${product._id}`}>
<img
className="w-full h-full object-cover cursor-pointer"
src={`http://localhost:8000/images/products/images/${product.images[0]}`}
alt={product.name}
/>
</Link>
</div>


<div className="p-4">
<h3 className="text-lg font-semibold mb-2 text-gray-800 truncate">
{product.name}
</h3>
<p className="text-sm text-gray-600 truncate">
{product.description || "No description available"}
</p>

<div className="flex justify-between items-center mt-4">

<span className="text-lg font-bold text-indigo-600">
{product.price} تومان
</span>


<button
className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 shadow"
onClick={handleAddToCart}
>
Add to Cart
</button>
</div>
</div>
</div>

);
};