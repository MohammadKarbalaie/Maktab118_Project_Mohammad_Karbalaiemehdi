"use client"
import React, { use, useEffect, useState } from "react";
import ProductDetails from "../../../components/Product/ProductDetailes";
import { getProductById } from "../../../services/product-service";
import { IProductById } from "../../../types/product";


interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params); 
  const [product, setProduct] = useState<IProductById["data"]["product"] | null>(
    null
  );

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await getProductById(id);
        if (response?.data?.product) {
          setProduct(response.data.product);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <ProductDetails product={product} />    
    </div>
  );
}
