import { IAddProduct } from "./types";
import { IProduct } from "./types";
import { urls } from "../../../adminserver/urls"; 
import apiClient from "../../../adminserver/server"; 
import { useState } from "react";

export const fetchEditProducts = async (id: string, data: IAddProduct) => {
  try {
    const formData = new FormData();
    
    // اضافه کردن داده‌های متنی به FormData
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("description", data.description);
    formData.append("subcategory", data.subcategory);
    formData.append("category", data.category);

    // اضافه کردن تصاویر به FormData
    data.images.forEach((image, index) => {
      formData.append("images", image); // تغییر اینجا به "images" (اگر انتظار دارید که سرور آن را به‌صورت آرایه‌ای از فایل‌ها دریافت کند)
    });

    // ارسال درخواست PATCH
    const response = await apiClient.patch(urls.productsid(id), formData, {
      headers: { "Content-Type": "multipart/form-data" } // افزودن هدر مناسب برای ارسال فایل‌ها
    });
    
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Response error data:", error.response.data); 
      throw new Error(error.response.data.message || "An error occurred while updating the product.");
    } else {
      console.error("Error:", error.message);
      throw new Error(error.message);
    }
  }
};

interface EditProductModalProps {
  onClose: () => void;
  product: IProduct;
  onSave: (productData: IProduct) => Promise<void>;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ onClose, product, onSave }) => {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [brand, setBrand] = useState(product.brand);
  const [subcategory, setSubCategory] = useState(product.subcategory);
  const [description, setDescription] = useState(product.description);
  const [images, setImages] = useState<File[]>([]); // ذخیره فایل‌های انتخاب شده

  // مدیریت تغییرات ورودی فایل‌ها
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files)); // تبدیل فایل‌ها به آرایه
    }
  };

  const handleSave = async () => {
    const updatedProduct: IProduct = {
      ...product,
      name,
      category,
      subcategory,
      brand,
      description,
    };

    try {
      await fetchEditProducts(product._id, { ...updatedProduct, images });
      onSave(updatedProduct);
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
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="p-2 bg-gray-700 text-white rounded-lg"
          />
          <input
            type="text"
            value={subcategory}
            onChange={(e) => setSubCategory(e.target.value)}
            placeholder="Subcategory"
            className="p-2 bg-gray-700 text-white rounded-lg"
          />
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Brand"
            className="p-2 bg-gray-700 text-white rounded-lg"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="p-2 bg-gray-700 text-white rounded-lg"
          />
          
          {/* ورودی فایل‌ها */}
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="p-2 bg-gray-700 text-white rounded-lg"
          />
        </form>
        <div className="flex gap-6 mt-4 justify-center">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
