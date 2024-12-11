/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, useEffect, ChangeEvent } from "react";
import Header from "../Header";
import { getAllProductsReq } from "../../../adminserver/services/products-services";
import { Category } from "../../../adminserver/type/Category";
import { getSubCategories } from "../../../adminserver/services/subcategory-services";
import { getCategories } from "../../../adminserver/services/category-services";
import { IProduct } from "./types";
import AddProductModal from "./ProductForm";  // به روز رسانی مسیر
import EditProductModal from "./UpdateProductForm"; // به روز رسانی مسیر
import { GrPrevious, GrNext } from "react-icons/gr";
import { DelProduct } from "../../../adminserver/services/products-services";  // سرویس حذف محصول

const ProductsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false); // نمایش فرم ویرایش
  const [showForm1, setShowForm1] = useState<boolean>(false); // نمایش فرم افزودن محصول
  const [productToEdit, setProductToEdit] = useState<IProduct | null>(null); // محصولی که قرار است ویرایش شود
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (currentPage: number) => {
    try {
      const response = await getAllProductsReq(currentPage, 6);
      setProducts(response.data.products);
      setTotalPages(response.total_pages);
      setFilteredProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response && response.data && Array.isArray(response.data.categories)) {
        setCategories(response.data.categories);
      } else {
        console.error("Categories data is not in the expected format:", response);
        setCategories([]); 
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]); 
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await getSubCategories();
      if (response && Array.isArray(response)) {
        setSubCategories(response);
      } else {
        console.error("Subcategories data is not in the expected format:", response);
        setSubCategories([]); 
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubCategories([]); 
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "نامشخص";
  };

  const getSubCategoryName = (subCategoryId: string) => {
    const subCategory = subCategories.find((sub) => sub._id === subCategoryId);
    return subCategory ? subCategory.name : "نامشخص";
  };

  useEffect(() => {
    fetchProducts(page);
    fetchCategories();
    fetchSubCategories();
  }, [page]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        getCategoryName(product.category).toLowerCase().includes(term) ||
        getSubCategoryName(product.subcategory).toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  // تابع برای حذف محصول
  const handleDeleteProduct = async (id: string) => {
    await DelProduct(id);
    fetchProducts(page);  // بازخوانی محصولات بعد از حذف
  };

  // تابع برای افزودن محصول
  const handleAddProduct = () => {
    setProductToEdit(null); // محصول جدید برای اضافه کردن
    setShowForm1(true); // نمایش مودال افزودن محصول
  };

  // تابع برای ویرایش محصول
  const handleEditProduct = (product: IProduct) => {
    setProductToEdit(product);  // قرار دادن محصول برای ویرایش
    setShowForm(true);  // نمایش مودال ویرایش
  };

  return (
    <div className="flex-1 -mt-6 overflow-auto relative z-10 px-4 sm:px-6 lg:px-8">
      <Header title="محصولات" />
      <motion.div
        className="bg-gray-900 backdrop-blur-md mt-6 shadow-lg rounded-xl p-4 sm:p-6 border border-gray-700 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-100">
            لیست محصولات
          </h2>
          <div className="xl:flex xl:gap-4 relative w-full sm:w-auto">
            <button
              className="w-full sm:w-auto px-4 py-2 bg-gray-100 text-black rounded-xl hover:bg-indigo-800 hover:text-gray-100 transition duration-200"
              onClick={handleAddProduct}  // فراخوانی برای افزودن محصول جدید
            >
              ایجاد محصول جدید
            </button>
            <div className="relative mt-2 sm:mt-0">
              <input
                type="text"
                placeholder="جستجوی محصولات ..."
                className="w-full sm:w-auto bg-gray-100 text-black placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSearch}
                value={searchTerm}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto min-w-full divide-y divide-gray-300 text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-start font-medium text-white uppercase tracking-wider">
                  تصویر محصول
                </th>
                <th className="px-4 py-2 text-start font-medium text-white uppercase tracking-wider">
                  نام محصول
                </th>
                <th className="px-4 py-2 text-start font-medium text-white uppercase tracking-wider">
                  دسته بندی
                </th>
                <th className="px-4 py-2 text-start font-medium text-white uppercase tracking-wider">
                  زیر دسته بندی
                </th>
                <th className="px-4 py-2 text-start font-medium text-white uppercase tracking-wider">
                  توضیحات
                </th>
                <th className="px-4 py-2 text-start font-medium text-white uppercase tracking-wider">
                  اقدامات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredProducts.map((product) => (
                <motion.tr
                  key={`${product._id}-${product.name}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-4 py-2 whitespace-nowrap text-gray-100">
                    <img
                      src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                      alt="Product img"
                      width={50}  // عرض تصویر
                      height={80}  // ارتفاع تصویر
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-100">
                    {product.name}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-300">
                    {getCategoryName(product.category)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-300">
                    {getSubCategoryName(product.subcategory)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-300 max-w-xs overflow-hidden text-ellipsis">
                    {product.description}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-300 flex gap-2">
                    <button 
                      className="text-indigo-500 hover:text-indigo-300" 
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-300"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center gap-4 pt-4">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className={`flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded ${
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <GrNext className="text-lg" />
            قبلی
          </button>
          <p className="text-white">
            {page} | {totalPages}
          </p>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded ${
              page === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            بعدی
            <GrPrevious className="text-lg" />
          </button>
        </div>
      </motion.div>

      {showForm1 && <AddProductModal onClose={() => setShowForm1(false)} />}
      
      {showForm && productToEdit && (
        <EditProductModal
          onClose={() => setShowForm(false)}
          product={productToEdit}
          onSave={async (updatedProduct: IProduct) => {
            console.log(updatedProduct); 
            fetchProducts(page);  // بارگذاری مجدد محصولات
            setShowForm(false);   // بستن مودال
          }}
        />
      )}
    </div>
  );
};

export default ProductsTable;
