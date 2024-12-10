import  apiClient  from '../server';
import { urls } from '../urls';
import axios from 'axios';
import { getAccessToken } from '../lib/tokenManager';
import { GetProductsResponse, IAddProduct, IProductById, Product, ProductData } from '../type/Product';
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

type getProductByIdType = (id:string) => Promise<IProductById>
export const getProductById:getProductByIdType = async(id) => {
try {
const response = await apiClient.get(urls.productsid(id));
console.log(response.data);

return response.data
} catch (error ) {
console.log(error || "خطا از طرف سرور میباشد.چند دقیقه دیگر دوباره تلاش کنید")
}
}


export const fetchEditProducts = async (id: string, data: IAddProduct) => {
  try {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("brand", data.brand);
  formData.append("description", data.description);
  // formData.append("quantity", data.quantity.toString());
  formData.append("images", data.images[0]);
  formData.append("subcategory", data.subcategory);
  formData.append("category", data.category);
  // formData.append("price", data.price.toString());
  const response = await apiClient.patch(urls.productsid(id), formData);
  return response.data;
  } catch (error) {
  throw error;
  }
  };
  


export const DelProduct = async (id:string) =>{
  try {
    const response = await apiClient.delete(urls.productsid(id));
    console.log(response.data);
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}
