/* eslint-disable @typescript-eslint/no-explicit-any */
import  apiClient  from './api';
import { urls } from './urls';
import { getAccessToken } from '../utils/token';
import { GetProductsResponse, IProduct, IProductById, Product, AddProduct } from '../types/product';
import axios from 'axios';

//-----------------------------------------------------------اضافه کردن محصولات 
export async function addProduct(data: FormData) {
  const token = getAccessToken();
  try {
    const response = await apiClient.post(urls.products, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Product added:", response.data);
  } catch (error: any) {
    console.error("Error adding product:", error.response?.data || error.message);
    throw error;
  }
}

//-----------------------------------------------------------اضافه کردن محصولات 

//----------------------------------------------فراخوانی کردن محصولات بر اساس دسته بندی


export const getProductsByCategoryId = async (
  categoryId: string,
  page: number,
  limit: number
) => {
  try {
    const response = await apiClient.get(urls.products, {
      params: { category: categoryId, page, limit }
    });
    console.log('hi b: ca',response);
    
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products for category:", error);
    return { products: [], total_pages: 0 };
  }
};
//----------------------------------------------فراخوانی کردن محصولات بر اساس دسته بندی


//-----------------------------------------------------------فراخوانی کردن محصولات 

export const getAllProductsReq = async (
  page: number,
  limit: number
): Promise<{ data: { products: IProduct[] }; total_pages: number }> => {
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

//-----------------------------------------------------------فراخوانی کردن محصولات 


//-------------------------------------------------------- فراخوانی کردن محصولات بر اساس id

type getProductByIdType = (id:string) => Promise<IProductById>
export const getProductById:getProductByIdType = async(id) => {
try {
const response = await apiClient.get(urls.productId(id));
console.log(response.data);

return response.data
} catch (error ) {
console.log(error || "خطا از طرف سرور میباشد.چند دقیقه دیگر دوباره تلاش کنید")
}
}
//-------------------------------------------------------- فراخوانی کردن محصولات بر اساس id


type FetchProductsResponse = Promise<Product[]>;

interface ProductsResponse {
  data: {
    products: Product[];
  };
}

export const getProduct: () => FetchProductsResponse = async () => {
  try {
    const response = await apiClient.get<ProductsResponse>(`${urls.products}?page=${1}&limit=${4}`);
    console.log(response.data.data.products);
    return response.data.data.products;
  } catch (error) {
    console.error(
      error || "خطا از طرف سرور می‌باشد. چند دقیقه دیگر دوباره تلاش کنید"
    );
    return [];
  }
};




export const getAllProductsReqs = async (page: number, limit: number, filters: any) => {
  try {
    const { category, subcategory, brands, minPrice, maxPrice } = filters;

    const params: any = {
      page,
      limit,
    };

    if (category && category.length > 0) {
      params.category = category.join(',');
    }

    if (subcategory && subcategory.length > 0) {
      params.subcategory = subcategory.join(',');
    }

    if (brands && brands.length > 0) {
      params.brands = brands.join(',');
    }

    if (minPrice) {
      params.minPrice = minPrice;
    }

    if (maxPrice) {
      params.maxPrice = maxPrice;
    }

    console.log("Sending params:", params);

    const response = await axios.get('http://localhost:8000/api/products', { params });
    
    console.log("API response:", response.data);

    const products = response.data.data.products;
    const totalPages = response.data.total_pages;

    if (products.length === 0) {
      console.log("No products found for the given filters.");
      return {
        data: [],
        total_pages: totalPages,
      };
    }

    return {
      data: products,
      total_pages: totalPages,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to load products. Please try again later.");
  }
};





//---------------------------------------------------------بروز رسانی محصولات   


export const fetchEditProducts = async (id: string, data: AddProduct) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity.toString()); // tabdile be string
    formData.append("price", data.price.toString()); // tabdile be string

    if (data.images && data.images.length > 0) {
      data.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail);
    }

    formData.append("subcategory", data.subcategory);
    formData.append("category", data.category);

    const response = await apiClient.patch(urls.productId(id), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log('response :', response);
    return response.data;
  } catch (error: any) {
    console.error("Error saving the product:", error.response?.data || error.message);
    throw error;
  }
};

//---------------------------------------------------------بروز رسانی محصولات   

  

//---------------------------------------------------------حذف یک محصول     

export const DelProduct = async (id:string) =>{
  try {
    const response = await apiClient.delete(urls.productId(id));
    console.log(response.data);
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

//---------------------------------------------------------حذف یک محصول     
