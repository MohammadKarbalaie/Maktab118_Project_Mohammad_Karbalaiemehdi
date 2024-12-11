export interface Category {
    _id:string;
    name: string; 
    slugname:string;
  }

  export interface Subcategory {
    id: string;
    categoryId: string;
     name: string;
}
