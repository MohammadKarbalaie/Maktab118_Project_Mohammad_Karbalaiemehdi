import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";


type SubCategory = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  name: string;
  icon: string; 
  subCategories: SubCategory[];
};

const CategoryTbl: React.FC = () => {
  const categories: Category[] = [
    {
      id: 1,
      name: "Furniture",
      icon: "https://via.placeholder.com/50",
      subCategories: [
        { id: 1, name: "Chairs" },
        { id: 2, name: "Sofas" },
      ],
    },
    {
      id: 2,
      name: "Electronics",
      icon: "https://via.placeholder.com/50",
      subCategories: [
        { id: 3, name: "Smartphones" },
        { id: 4, name: "Laptops" },
      ],
    },
    {
      id: 3,
      name: "Clothing",
      icon: "https://via.placeholder.com/50",
      subCategories: [
        { id: 5, name: "Men's Wear" },
        { id: 6, name: "Women's Wear" },
      ],
    },
  ];

  return (
    <div className="w-full bg-gray-200 bg-opacity-50 backdrop-blur-md mb-6 shadow-lg rounded-xl p-6 border">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">لیست دسته بندی ها</h3>
      <div className="overflow-x-auto rounded-md">
        <table className="table-auto w-full border rounded-md bg-white border-slate-200 ">
          <thead>
            <tr className="bg-slate-400 ">
              <th className="border-b border-slate-800 px-4 py-2 text-slate-100">تصویر</th>
              <th className="border-b border-slate-800 px-4 py-2 text-slate-100">سرگروه</th>
              <th className="border-b border-slate-800 px-4 py-2 text-slate-100">زیرگروه</th>
              <th className="border-b border-slate-800 px-4 py-2 text-slate-100">اقدامات</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-slate-100 cursor-pointer transition duration-200">
                <td className="border-b flex items-center justify-center border-slate-200 px-4 py-2">
                <img
              src={category.icon}
              alt={category.name}
              className="w-12 h-12 object-cover rounded mr-4"
            />
                </td>
  
                <td className="border-b border-slate-200 px-4 py-2 text-slate-700">
                  {category.name}
                </td>
               
                <td className="border-b border-slate-200 px-4 py-2">
                  <ul className="list-disc mr-5 text-slate-600">
                    {category.subCategories.map((subCategory) => (
                      <li key={subCategory.id}>{subCategory.name}</li>
                    ))}
                  </ul>
                </td>

                <td className="border-b border-slate-200 px-4 py-2 text-slate-700">
                    <div className="flex gap-4 justify-center">
                      <p className="text-xl text-sky-400 hover:text-sky-600 transition duration-200"><BiEdit/></p>
                      <p className="text-xl text-red-400 hover:text-red-600 transition duration-200"><AiFillDelete /></p>
                    </div>
                </td>
              </tr>
            ))}

            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTbl;
