"use client"
import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

type Product = string;
type Subcategory = {
  name: string;
  products: Product[];
};
type Category = {
  name: string;
  subcategories: Subcategory[];
};

type CategoryComponentProps = Record<string, unknown>;

const CategoryComponent: React.FC<CategoryComponentProps> = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [visibleSubcategories, setVisibleSubcategories] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories"); // Adjust the API endpoint as needed
        const data: Category[] = await response.json();
        console.log('hi',response);
        
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleSubcategory = (name: string) => {
    setVisibleSubcategories((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      {categories.map((category) => (
        <div key={category.name} className="mb-6">
          <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
          {category.subcategories.map((subcategory) => (
            <div key={subcategory.name} className="ml-4">
              <p
                className="text-blue-500 cursor-pointer underline mb-2"
                onClick={() => toggleSubcategory(subcategory.name)}
              >
                {subcategory.name}
              </p>
              {visibleSubcategories[subcategory.name] && (
                <div className="ml-6">
                  {subcategory.products.map((product) => (
                    <p key={product} className="text-gray-700">
                      {product}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CategoryComponent;
