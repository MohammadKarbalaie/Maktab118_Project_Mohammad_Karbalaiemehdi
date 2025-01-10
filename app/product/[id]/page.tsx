"use client";

import React from "react";
import { useParams } from "next/navigation";
import ProductDetails from "../../../components/Product/ProductDetailes";

const ProductPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;

  return <ProductDetails productId={id} />;
};

export default ProductPage;
