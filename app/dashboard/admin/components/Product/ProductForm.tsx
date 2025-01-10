/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { addProduct } from "../../../../../services/product-service";
import { getCategories } from "../../../../../services/category-service";
import { getSubCategories } from "../../../../../services/subcategory-service";
import { ICategory } from "../../../../../types/category";
import { Subcategory } from "../../../../../types/subcategory";
import {ProductData} from "../../../../../types/product";;
import CustomUpload from "../Upload";
import { toast } from "react-hot-toast";
import { ErrorHandler } from "@/utils/ErrorHandler";


const AddProductModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [product, setProduct] = useState<ProductData>({
    category: "",
    subcategory: "",
    name: "",
    price: 0,
    quantity: 0,
    brand: "",
    description: "",
    thumbnail: null,
    images: [],
  });
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const formattedCategories = response.data.categories.map((cat: { _id: string; name: string }) => ({
          id: cat._id,
          name: cat.name,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setError("خطا در دریافت دسته‌ها.");
      }
    };

    const fetchSubcategories = async () => {
      try {
        const fetchedSubcategories = await getSubCategories();
        if (Array.isArray(fetchedSubcategories)) {
          const formattedSubcategories = fetchedSubcategories.map((subcat) => ({
            id: subcat._id || subcat.id,
            name: subcat.name || "Unnamed Subcategory",
            categoryId: subcat.categoryId || subcat.category, 
          }));
          setSubcategories(formattedSubcategories);
        } else {
          throw new Error("Invalid subcategories format");
        }
      } catch (error) {
        console.error("Failed to fetch subcategories:", error);
        setSubcategories([]);
        setError("Failed to fetch subcategories.");
      }
    };

    fetchCategories();
    fetchSubcategories();
  }, []);

  useEffect(() => {
    if (product.category) {
      setFilteredSubcategories(subcategories.filter((subcat) => subcat.categoryId === product.category));
    } else {
      setFilteredSubcategories([]);
    }
  }, [product.category, subcategories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProduct({ ...product, thumbnail: file });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setProduct({ ...product, images: Array.from(files) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append("category", product.category);
        formData.append("subcategory", product.subcategory);
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        formData.append("quantity", product.quantity.toString());
        formData.append("brand", product.brand);
        formData.append("description", product.description);

        if (product.thumbnail) formData.append("thumbnail", product.thumbnail);
        product.images.forEach((image) => formData.append("images", image));

        await addProduct(formData);

        // نمایش پیغام موفقیت
        toast.success("کالای جدید با موفقیت اضافه شد.", {
            position: "top-right",
            style: {
                backgroundColor: "green",
                color: "white",
            },
        });

        // بستن مودال
        onClose();

        setProduct({
            category: "",
            subcategory: "",
            name: "",
            price: 0,
            quantity: 0,
            brand: "",
            description: "",
            thumbnail: null,
            images: [],
        });
    } catch (error) {
        ErrorHandler(error);
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="mt-4 p-6 bg-gray-800 rounded-xl shadow-lg w-full max-w-lg">
        {loading && <p className="text-white">در حال ارسال...</p>}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <h2 className="text-white text-xl">افزودن کالای جدید</h2>
          <input type="text" name="name" placeholder="نام کالا" onChange={handleChange} required className="p-2 bg-gray-700 text-white rounded-lg" />
          <select name="category" value={product.category} onChange={handleChange} required className="p-2 bg-gray-700 text-white rounded-lg">
            <option value="">انتخاب دسته</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select name="subcategory" value={product.subcategory} onChange={handleChange} required className="p-2 bg-gray-700 text-white rounded-lg">
            <option value="">انتخاب زیر دسته</option>
            {filteredSubcategories.map((subcat) => (
              <option key={subcat.id} value={subcat.id}>
                {subcat.name}
              </option>
            ))}
          </select>
          <input type="number" name="price" placeholder="قیمت" onChange={handleChange} required className="p-2 bg-gray-700 text-white rounded-lg" />
          <input type="number" name="quantity" placeholder="تعداد" onChange={handleChange} required className="p-2 bg-gray-700 text-white rounded-lg" />
          <input type="text" name="brand" placeholder="برند" onChange={handleChange} required className="p-2 bg-gray-700 text-white rounded-lg" />
          <textarea name="description" placeholder="توضیحات" onChange={handleChange} required className="p-2 bg-gray-700 text-white rounded-lg" />
          <input type="file" name="thumbnail" onChange={handleThumbnailChange} required className="p-2 bg-gray-700 text-white rounded-lg" />
          <CustomUpload multiple={true} onChange={handleImageChange} />

          <div className="flex gap-6">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700" type="submit">
              ذخیره
            </button>
            <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700" type="button" onClick={onClose}>
              بستن
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
