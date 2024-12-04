import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, ChangeEvent, useEffect } from "react";
import Header from "../Header";
import { getAllProductsReq } from "../../../adminserver/services/products-services";
import { Product } from "./types";
import NewProductForm from "./ProductForm";
import { GrPrevious, GrNext } from "react-icons/gr";

const ProductsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
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

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) || product.category.includes(term)
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
              onClick={() => setShowForm(true)}
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
          <table className="min-w-full divide-y divide-gray-300 text-sm">
            <thead>
              <tr>
                <th className="px-2 sm:px-6 py-3 text-start font-medium text-white uppercase tracking-wider">
                  نام محصول
                </th>
                <th className="px-2 sm:px-6 py-3 text-start font-medium text-white uppercase tracking-wider">
                  دسته بندی
                </th>
                <th className="px-2 sm:px-6 py-3 text-start font-medium text-white uppercase tracking-wider">
                  زیر دسته بندی
                </th>
                <th className="px-2 sm:px-6 py-3 text-start font-medium text-white uppercase tracking-wider">
                  قیمت
                </th>
                <th className="px-2 sm:px-6 py-3 text-start font-medium text-white uppercase tracking-wider">
                  تعداد
                </th>
                <th className="px-2 sm:px-6 py-3 text-start font-medium text-white uppercase tracking-wider">
                  برند
                </th>
                <th className="px-2 sm:px-6 py-3 text-start font-medium text-white uppercase tracking-wider">
                  توضیحات
                </th>
                <th className="px-2 sm:px-6 py-3 text-start font-medium text-white uppercase tracking-wider">
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
                  <td className="flex items-center gap-2 px-2 sm:px-6 py-4 whitespace-nowrap text-gray-100">
                    <img
                      src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                      alt="Product img"
                      className="w-12 h-8 rounded"
                    />
                    <div className="truncate">{product.name}</div>
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-gray-300">
                    {product.category}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-gray-300">
                    {product.subcategory}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-gray-300">
                    {Number(product.price).toLocaleString()} تومان
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-gray-300">
                    {product.quantity}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-gray-300">
                    {product.brand}
                  </td>
                  <td className="px-2 sm:px-6  text-gray-300 line-clamp-1">
                    {product.description}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-gray-300 flex gap-2">
                    <button className="text-indigo-500 hover:text-indigo-300">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-300">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
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

      {showForm && <NewProductForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default ProductsTable;
