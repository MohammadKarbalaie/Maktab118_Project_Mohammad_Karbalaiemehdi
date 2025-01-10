import React, { useState, useEffect } from "react";
import { AiFillDatabase, AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { getCategories } from "../../../../../services/category-service";
import { getSubCategories } from "../../../../../services/subcategory-service";
import NewCategoryForm from "./CategoryForm";
import SubCategoryForm from "./SubCategoryForm";
import { IICategory } from "@/types/category";
import { ISubcategory } from "@/types/subcategory";



const CategoryTbl: React.FC = () => {
  const [categories, setCategories] = useState<IICategory[]>([]);
  const [subcategories, setSubCategories] = useState<ISubcategory[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showSubCategoryForm, setShowSubCategoryForm] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      console.log(response);
      if (response && response.data && Array.isArray(response.data.categories)) {
      
        
        setCategories(response.data.categories);
      } else {
        console.error("Data is not in expected format", response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await getSubCategories();
      if (response && Array.isArray(response)) {
        setSubCategories(response);
      } else {
        console.error("Data is not in expected format for subcategories", response);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const handleAddSubCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setShowSubCategoryForm(true);
  };

  const handleCloseSubCategoryForm = () => {
    setShowSubCategoryForm(false);
    setSelectedCategoryId(null);
  };

  return (
    <div className="w-full bg-gray-200 bg-opacity-50 backdrop-blur-md mb-6 shadow-lg rounded-xl p-4 sm:p-6 border">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-800">
          لیست دسته بندی ها
        </h3>
        <button
          className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-gray-950 text-white rounded-xl hover:bg-indigo-800 hover:text-gray-100 transition duration-200"
          onClick={() => setShowForm(true)}
        >
          ساخت دسته بندی جدید (سرگروه)
        </button>
      </div>

      {showForm && <NewCategoryForm onClose={() => setShowForm(false)} />}
      {showSubCategoryForm && (
        <SubCategoryForm
          onClose={handleCloseSubCategoryForm}
          categoryId={selectedCategoryId}
          onCategoryAdded={fetchCategories}
        />
      )}

      <div className="overflow-x-auto rounded-md">
        <table className="table-auto w-full border rounded-md bg-white border-slate-200">
          <thead>
            <tr className="bg-slate-400">
              <th className="border-b border-slate-800 px-4 py-2 text-xs sm:text-sm md:text-base text-slate-100">
                دسته بندی
              </th>
              <th className="border-b border-slate-800 px-4 py-2 text-xs sm:text-sm md:text-base text-slate-100">
                زیر دسته بندی
              </th>
              <th className="border-b border-slate-800 px-4 py-2 text-xs sm:text-sm md:text-base text-slate-100">
                اقدامات
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr
                  key={category._id}
                  className="hover:bg-slate-100 transition duration-150"
                >
                  <td className="border-b px-4 py-4 text-sm md:text-base">
                    {category.name}
                  </td>
                  <td className="border-b px-4 py-4 text-sm md:text-base">
                    <div className="flex flex-wrap gap-2">
                      {subcategories.length > 0 ? (
                        subcategories
                          .filter(
                            (subcategory) => subcategory.category === category._id
                          )
                          .map((subcategory) => (
                            <span
                              key={subcategory._id}
                              className="px-2 py-1 bg-gray-300 text-gray-800 rounded-lg text-xs md:text-sm"
                            >
                              {subcategory.name}
                            </span>
                          ))
                      ) : (
                        <p>زیر دسته‌ای وجود ندارد</p>
                      )}
                    </div>
                  </td>
                  <td className="border-b px-4 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleAddSubCategory(category._id)}
                        className="text-green-500 text-lg md:text-xl"
                      >
                        <AiFillDatabase />
                      </button>
                      <button className="text-red-500 text-lg md:text-xl">
                        <AiFillDelete />
                      </button>
                      <button className="text-yellow-800 text-lg md:text-xl">
                        <BiEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-4 text-slate-500 text-sm md:text-base"
                >
                  هیچ دسته بندی موجود نیست.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTbl;
