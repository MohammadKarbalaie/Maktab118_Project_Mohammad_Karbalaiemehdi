import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { UseFormRegister } from "react-hook-form";
import { FieldValues } from "./fromschema";

interface FormFieldProps {
  label: string;
  name: keyof FieldValues; 
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  register: UseFormRegister<FieldValues>;
  error?: string;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  placeholder,
  icon,
  register,
  error,
  showPassword,
  setShowPassword,
}) => {
  const isPasswordField = type === "password";

  return (
    <div className="flex flex-col my-4">
      <label className="text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input
          {...register(name)}
          className={`w-full py-3 pl-10 pr-12 border-b-2 border-gray-800 outline-none ${
            error ? "border-red-500" : ""
          }`}
          type={isPasswordField ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
        />

        {icon && !isPasswordField && (
          <div className="absolute left-2 top-3 transform -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        {isPasswordField && setShowPassword && (
          <button
            type="button"
            className="absolute left-2 top-6 text-2xl transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default FormField;
