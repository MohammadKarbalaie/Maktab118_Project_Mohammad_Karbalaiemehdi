import React, { useState, useEffect } from "react";
import { addProduct } from "@/app/adminserver/services/products-services";
import { getCategories } from "../../../adminserver/services/category-services";
import { getSubCategories } from "../../../adminserver/services/subcategory-services";
import ErrorHandler from "../../../adminserver/lib/ErrorHandler";
import { Category, Product, Subcategory } from "./types";
import CustomUpload from "../Upload";

const AddProductModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [product, setProduct] = useState<Product>({
    category: "",
    subcategory: "",
    name: "",
    price: 0,
    quantity: 0,
    brand: "",
    description: "",
    images: [] as File[],
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    Subcategory[]
  >([]); // فیلتر شده برای زیر دسته‌بندی‌ها
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (
          response.status === "success" &&
          Array.isArray(response.data.categories)
        ) {
          const formattedCategories = response.data.categories.map(
            (cat: { _id: string; name: string }) => ({
              id: cat._id,
              name: cat.name,
            })
          );
          setCategories(formattedCategories);
        } else {
          throw new Error("Invalid categories format");
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
        setError("Failed to fetch categories.");
      }
    };

    const fetchSubcategories = async () => {
      try {
        const fetchedSubcategories = await getSubCategories();
        if (Array.isArray(fetchedSubcategories)) {
          const formattedSubcategories = fetchedSubcategories.map((subcat) => ({
            id: subcat._id || subcat.id,
            name: subcat.name || "Unnamed Subcategory",
            categoryId: subcat.categoryId || subcat.category, // اضافه کردن categoryId برای فیلتر
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
      setFilteredSubcategories(
        subcategories.filter((subcat) => subcat.categoryId === product.category)
      );
    } else {
      setFilteredSubcategories([]);
    }
  }, [product.category, subcategories]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setProduct({ ...product, images: Array.from(files) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("category", product.category);
      formData.append("subcategory", product.subcategory);
      formData.append("name", product.name);
      formData.append("price", product.price.toString());
      formData.append("quantity", product.quantity.toString());
      formData.append("brand", product.brand);
      formData.append("description", product.description);

      product.images.forEach((image) => {
        formData.append("images", image);
      });

      await addProduct(formData);
      setSuccessMessage("کالای جدید با موفقیت اضافه شد.");
      setError(null);
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      setError("خطا در افزودن کالا");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="mt-4 p-6 bg-gray-800 rounded-xl shadow-lg w-full max-w-lg">
        {error && <ErrorHandler message={error} type="error" />}
        {successMessage && (
          <ErrorHandler message={successMessage} type="success" />
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <h2 className="text-white text-xl">افزودن کالای جدید</h2>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            required
            className="p-2 bg-gray-700 text-white rounded-lg"
          />
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="p-2 bg-gray-700 text-white rounded-lg"
          >
            <option value="">Select Category</option>
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option value="">No Categories Available</option>
            )}
          </select>
          <select
            name="subcategory"
            value={product.subcategory}
            onChange={handleChange}
            required
            className="p-2 bg-gray-700 text-white rounded-lg"
          >
            <option value="">Select Subcategory</option>
            {filteredSubcategories.length > 0 ? (
              filteredSubcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))
            ) : (
              <option value="">No Subcategories Available</option>
            )}
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
            className="p-2 bg-gray-700 text-white rounded-lg"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            required
            className="p-2 bg-gray-700 text-white rounded-lg"
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            onChange={handleChange}
            required
            className="p-2 bg-gray-700 text-white rounded-lg"
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required
            className="p-2 bg-gray-700 text-white rounded-lg"
          />
          <CustomUpload multiple={true} onChange={handleImageChange} />

          <div className="flex gap-6">
            <button
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              type="submit"
            >
              ذخیره
            </button>
            <button
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              type="button"
              onClick={onClose}
            >
              بستن
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
