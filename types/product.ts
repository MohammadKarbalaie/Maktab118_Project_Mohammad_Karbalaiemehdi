export interface ProductData {
    name: string;
    category: string;
    subcategory: string;
    price: number;
    quantity: number;
    brand: string;
    description: string;
    thumbnail: File | null;
    images: File[];
  }
  
  export interface IProduct {
      _id:string
      name: string;
      category: string;
      subcategory: string;
      price: number;
      quantity: number;
      brand: string;
      description: string;
      thumbnail: File | null; 
      images: File[]; 
    }


    

    export interface I_Product {
      _id:string
      name: string;
      price: number;
      quantity: number;
    }
    
    
    export interface Product {
      _id:string;
      category: string;
      subcategory: string;
      name: string;
      price: number;
      quantity: number;
      brand: string;
      description: string;
      thumbnail:File | null
      images: File[];
    }

    export interface IIIProduct {
      _id:string;
      category: string;
      subcategory: string;
      name: string;
      price: string;
      quantity: string;
      brand: string;
      description: string;
      thumbnail:File | null
      images: File[];
    }
    
    export interface GetProductsResponse {
      page: number;
      per_page: number;
      total: number;
      total_pages: number;
      data: {
        products: IProduct[];
      };
    }
  
    export interface IProductById {
      status: string;
      data: {
        product: {
          rating: {
            rate: number;
            count: number;
          };
          _id: string;
          category: {
            _id: string;
            name: string;
            icon: string;
            createdAt: string;
            updatedAt: string;
            slugname: string;
            __v: number;
          };
          subcategory: {
            _id: string;
            category: string;
            name: string;
            createdAt: string;
            updatedAt: string;
            slugname: string;
            __v: number;
          };
          name: string;
          price: number;
          quantity: number;
          brand: string;
          description: string;
          thumbnail: string;
          images: File[];
          createdAt: string;
          updatedAt: string;
          slugname: string;
          __v: number;
        };
      };
    }
  
    export interface IAddProduct {
      name: string;
      brand: string;
      subcategory: string;
      category: string;
      price: number;
      quantity: number;
      description: string;
      thumbnail:File | null
      images: File[];
    }

    export interface AddProduct {
      name: string;
      brand: string;
      subcategory: string;
      category: string;
      price: number;
      quantity: number;
      description: string;
      thumbnail:File | null
      images: File[];
    }


  
  
  
  
  