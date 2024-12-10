"use client";
import { BiBasket } from "react-icons/bi";
import { getProductById } from "../../../adminserver/services/products-services";
import { IProductById } from "../../../adminserver/services/products-services";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProductDetailsPage() {
  const [product, setProduct] = useState<
    IProductById["data"]["product"] | null
  >(null);
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  useEffect(() => {
    if (!id) return;

    const fetchProductDetails = async () => {
      try {
        const response = await getProductById(id);
        console.log("API Response:", response);
        if (response?.data?.product) {
          setProduct(response.data.product);
        } else {
          console.error("Product data is missing in response:", response);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="container w-[1440px] mx-auto py-8 px-4">
      <div className="bg-gray-100">
        <div className="flex mx-auto px-4 py-8">
          <div>
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2">
                <p className="text-gray-800 w-[600px] mb-20">{product.name}</p>
              </h2>
            </div>
            <p className="text-gray-700 mb-6 w-96">{product.description}</p>

            <p className="text-gray-600 mb-4">{product.brand}</p>
            <p className="text-gray-600 mb-4">{product.category.name} / {product.subcategory.name}</p>
            <div className="mb-10">
              <span className="text-2xl font-bold mr-2 ">
                {product.price.toLocaleString()} تومان
              </span>
            </div>

            <div className="flex space-x-4 mb-6">
              <button className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
               <BiBasket className="text-3xl"/>
              </button>
            </div>
          </div>

          <div>
            <img
              className="w-[700px] h-[450px] mr-2 object-fill"
              src={`http://localhost:8000/images/products/images/${product.images[0]}`}
              alt={product.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
