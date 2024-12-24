export interface Category {
    _id:string;
    name: string; 
    slugname:string;
  }


export interface ICategory {
    id: string;
    name: string;
  }

  export type IICategory = {
    _id: string;
    name: string;
    subcategories?: Array<{ _id: string; name: string }>;
  };