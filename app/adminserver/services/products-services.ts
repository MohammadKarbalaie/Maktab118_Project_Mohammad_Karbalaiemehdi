import  apiClient  from '../server';
import { urls } from '../urls';
import axios from 'axios';
import { getAccessToken } from '../lib/tokenManager';

export interface Product {
  _id:string
  name: string;
  category: string;
  subcategory: string;
  price: string;
  quantity: string;
  brand: string;
  description: string;
  thumbnail: File | string | null; 
  images: File[];
}

export interface ProductData {
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  images: File[];
}

export async function addProduct(data: ProductData) {
  const token = getAccessToken();   

  try {
    const response = await apiClient.post(urls.products, data, { 
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', 
      },
    });

    console.log('Product added:', response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error adding product:', error.response.data);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}


interface GetProductsResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    products: Product[];
  };
}

export const getAllProductsReq = async (
  page: number,
  limit: number
): Promise<{ data: { products: Product[] }; total_pages: number }> => {
  try {
    const response: { data: GetProductsResponse } = await apiClient.get(
      `${urls.products}?page=${page}&limit=${limit}`
    );

    const products = response.data.data.products;
    const total_pages = response.data.total_pages;

    console.log("Fetched products:", products, "Total pages:", total_pages);

    return { data: { products }, total_pages };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch products:", error.message);
      if ("response" in error && error.response) {
        console.error("Server Response:", error.response);
      }
    }
    throw error;
  }
};
