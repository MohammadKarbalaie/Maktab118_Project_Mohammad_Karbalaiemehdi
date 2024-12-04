import React, { useState, useEffect } from "react";
import { AiFillDatabase, AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { getCategories } from "../../../adminserver/services/category-services";
import { getSubCategories } from "../../../adminserver/services/subcategory-services"; 
import NewCategoryForm from "./CategoryForm";
import SubCategoryForm from "./SubCategoryForm"; 

type Category = {
  _id: string;
  name: string;
  icon: string;
  subcategories?: Array<{ _id: string; name: string }>; 
};

const CategoryTbl: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubCategories] = useState<any[]>([]); 
  const [showForm, setShowForm] = useState(false);
  const [showSubCategoryForm, setShowSubCategoryForm] = useState(false); 
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null); 

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
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
    <div className="w-full bg-gray-200 bg-opacity-50 backdrop-blur-md mb-6 shadow-lg rounded-xl p-6 border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-800">لیست دسته بندی ها</h3>
        <button
          className="px-6 py-3 bg-gray-950 text-white rounded-xl hover:bg-indigo-800 hover:text-gray-100 transition duration-200"
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
              <th className="border-b border-slate-800 px-4 py-2 text-slate-100">دسته بندی</th>
              <th className="border-b border-slate-800 px-4 py-2 text-slate-100">زیر دسته بندی</th>
              <th className="border-b border-slate-800 px-4 py-2 text-slate-100">اقدامات</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category._id} className="hover:bg-slate-100">
                  <td className="border-b px-4 py-6">{category.name}</td>
                  <td className="border-b px-4 ">
                      <div className="flex gap-4">
                      {subcategories.length > 0 ? (
                      subcategories
                        .filter((subcategory) => subcategory.category === category._id) 
                        .map((subcategory) => (
                          <div key={subcategory._id}>{subcategory.name}</div>
                        ))
                    ) : (
                      <p>زیر دسته‌ای وجود ندارد</p>
                    )}
                      </div>
                  </td>
                  <td className="border-b px-4 py-2 text-center">
                    <button
                      onClick={() => handleAddSubCategory(category._id)} 
                      className="text-green-500 text-2xl"
                    >
                      <AiFillDatabase />
                    </button>
                    <button className="text-red-500 text-2xl">
                    <AiFillDelete/>
                    </button>
                    <button className="text-yellow-800 text-2xl">
                    <BiEdit/>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-slate-500">
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
