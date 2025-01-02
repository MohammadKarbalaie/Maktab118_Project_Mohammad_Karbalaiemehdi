"use client"

import React from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ProductDetails from '../../../components/Product/ProductDetailes';
import { Product } from '../../redux/slices/cartSlice';

const ProductPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const products = useSelector((state: RootState) => state.cart.products);
  
  const product = products.find(p => p._id === id);

  const transformProduct = (p: Product | undefined) => {
    if (!p) return null;
    return {
      ...p,
      category: { name: p.category },
      subcategory: { name: p.subcategory }
    };
  };

  const transformedProduct = transformProduct(product);

  if (!transformedProduct) {
    return <div>Product not found</div>;
  }

  return <ProductDetails product={transformedProduct} />;
};

export default ProductPage;

