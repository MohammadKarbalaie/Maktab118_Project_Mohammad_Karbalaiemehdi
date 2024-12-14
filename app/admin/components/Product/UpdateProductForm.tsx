/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAddProduct } from "./types";
import { IProduct } from "./types";
import { urls } from "../../../adminserver/urls";
import apiClient from "../../../adminserver/server";
import { useState, useEffect } from "react";
import CustomUpload from "../Upload";
import { fetchEditProducts } from "@/app/adminserver/services/products-services";

export const getCategories = async () => {
  try {
    const response = await apiClient.get(urls.categories);
    return response.data.data.categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};

export const getSubCategories = async () => {
  try {
    const response = await apiClient.get(urls.subcategories);
    return response.data.data.subcategories;
  } catch (error) {
    console.error("Failed to fetch subcategories:", error);
    throw error;
  }
};

interface EditProductModalProps {
  onClose: () => void;
  product: IProduct;
  onSave: (productData: IProduct) => Promise<void>;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  onClose,
  product,
  onSave,
}) => {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [brand, setBrand] = useState(product.brand);
  const [subcategory, setSubCategory] = useState(product.subcategory);
  const [description, setDescription] = useState(product.description);
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.price);
  const [thumbnail, setThumbnail] = useState<File | null>(null); 
  const [images, setImages] = useState<File[]>([]);

  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubCategories] = useState<any[]>([]);

  useEffect(() => {
    const loadCategoriesAndSubCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        const subcategoriesData = await getSubCategories();
        setSubCategories(subcategoriesData);
      } catch (error) {
        console.error("Error fetching categories and subcategories:", error);
      }
    };

    loadCategoriesAndSubCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    const updatedProduct: IAddProduct = {
      name,
      category,
      subcategory,
      price,
      quantity,
      thumbnail,
      brand,
      description,
      images,
    };

    try {
      await fetchEditProducts(product._id, updatedProduct);
      onSave(updatedProduct as IProduct);
      onClose();
    } catch (error) {
      console.error("Error saving the product:", error);
      alert("Error saving the product! Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="mt-4 p-6 bg-gray-800 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-white text-xl pb-3">Edit Product</h2>
        <form className="grid gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="p-2 bg-gray-700 text-white rounded-lg"
          />

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity((e.target.value))}
            placeholder="Quantity"
            className="p-2 bg-gray-700 text-white rounded-lg"
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice((e.target.value))}
            placeholder="Price"
            className="p-2 bg-gray-700 text-white rounded-lg"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 bg-gray-700 text-white rounded-lg"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={subcategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="p-2 bg-gray-700 text-white rounded-lg"
          >
            <option value="">Select Subcategory</option>
            {subcategories
              .filter((subcat) => subcat.category === category)
              .map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
          </select>

          <input
            type="file"
            onChange={handleThumbnailChange}
            className="p-2 bg-gray-700 text-white rounded-lg"
          />

          <CustomUpload multiple={true} onChange={handleImageChange} />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="p-2 bg-gray-700 text-white rounded-lg"
          />
        </form>

        <div className="flex gap-6 mt-4 justify-center">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            onClick={handleSave}
          >
            ویرایش
          </button>
          <button
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            onClick={onClose}
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
