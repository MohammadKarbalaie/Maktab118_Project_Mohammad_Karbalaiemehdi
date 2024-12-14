export interface Category {
    _id:string;
    name: string; 
    slugname:string;
  }


export interface ICategory {
    id: string;
    name: string;
  }
  
  export interface Subcategory {
    id: string;
    name: string;
    categoryId: string; 
  }

  export interface ISubcategory {
    _id: string;
    name: string;
    category: string; 
  }
