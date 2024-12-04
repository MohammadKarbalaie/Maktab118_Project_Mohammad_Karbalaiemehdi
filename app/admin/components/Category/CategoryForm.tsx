import { ChangeEvent, useState } from "react";
import { addCategory } from "@/app/adminserver/services/category-services"; 

interface NewCategoryFormProps {
  onClose: () => void; 
}

const NewCategoryForm: React.FC<NewCategoryFormProps> = ({ onClose }) => {
  const [newCategory, setNewCategory] = useState<{ name: string }>({
    name: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await addCategory(newCategory);
      alert("دسته‌بندی با موفقیت اضافه شد!");
      onClose(); 
    } catch (error) {
      alert("خطا در اضافه کردن دسته‌بندی.");
      console.error(error);
    }
  };

  return (
    <div className="mt-4 p-6 bg-gray-800 rounded-xl shadow-lg">
      <h3 className="text-white text-lg mb-4">افزودن دسته‌بندی جدید</h3>
      <div className="grid gap-4">
        <input
          type="text"
          name="name"
          placeholder="نام دسته‌بندی"
          className="p-2 bg-gray-700 text-white rounded-lg"
          value={newCategory.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-end mt-4 gap-4">
        <button
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          onClick={onClose}
        >
          لغو
        </button>
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={handleSubmit}
        >
          ذخیره
        </button>
      </div>
    </div>
  );
};

export default NewCategoryForm;
