import React, { useState } from 'react';
import { addSubCategory } from '../../../adminserver/services/subcategory-services'; 

interface SubCategoryFormProps {
  categoryId: string | null;
  onClose: () => void; 
  onCategoryAdded: () => void; 
}

const SubCategoryForm: React.FC<SubCategoryFormProps> = ({ categoryId, onClose, onCategoryAdded }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string>(''); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryId || !name) {
      setError("نام زیر دسته و دسته بندی باید وارد شوند.");
      return;
    }

    try {
      const subcategoryData = { 
        name, 
        category: categoryId  
      };

      const response = await addSubCategory(subcategoryData);

      if (response.status === 'success') {
        onCategoryAdded();
        onClose();
      }
    } catch (error) {
      setError('خطا در ارسال داده‌ها');
      console.error("Error adding subcategory:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-semibold text-center mb-4">افزودن زیر دسته</h3>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="نام زیر دسته"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
            >
              ایجاد زیر دسته
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
            >
              بستن
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCategoryForm;
