/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

interface CustomUploadProps {
  multiple?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}

const CustomUpload: React.FC<CustomUploadProps> = ({ multiple = false, onChange }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);

      if (onChange) {
        onChange(e);
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null); 
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
      >
        {selectedImage ? (
          <div className="flex flex-col items-center">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              className="h-16 w-16 object-cover rounded mb-2"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedImage.name}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">کلیک برای آپلود </span> 
               فایل خود را به اینجا بکشید و رها کنید
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              فقط JPG (MAX. 800x400px)
            </p>
          </div>
        )}
        <input
          type="file"
          id="dropzone-file"
          accept="image/jpeg"
          multiple={multiple}
          onChange={handleImageChange} 
          className="hidden"
        />
      </label>
      {selectedImage && (
        <button
          type="button"
          onClick={handleRemoveImage}
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          حذف عکس
        </button>
      )}
    </div>
  );
};

export default CustomUpload;
