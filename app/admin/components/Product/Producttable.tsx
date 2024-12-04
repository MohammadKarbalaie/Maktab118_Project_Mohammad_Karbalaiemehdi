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
    <div className="w-[1500px] flex-1 -mt-6 overflow-auto relative z-10">
      <Header title="محصولات" />
      <motion.div
        className="bg-gray-900 backdrop-blur-md mt-6 shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100">لیست محصولات</h2>
          <div className="relative">
            <button
              className="px-6 py-2 ml-4 bg-gray-100 text-black rounded-xl hover:bg-indigo-800 hover:text-gray-100 transition duration-200"
              onClick={() => setShowForm(true)}
            >
              ایجاد محصول جدید
            </button>
            <input
              type="text"
              placeholder="جستجوی محصولات ..."
              className="bg-gray-100 text-black placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
              value={searchTerm}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y text-white divide-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 text-start text-xs font-medium text-white uppercase tracking-wider">
                  نام محصول
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-white uppercase tracking-wider">
                  دسته بندی
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-white uppercase tracking-wider">
                  زیر دسته بندی
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-white uppercase tracking-wider">
                  قیمت
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-white uppercase tracking-wider">
                  تعداد
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-white uppercase tracking-wider">
                  برند
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-white uppercase tracking-wider">
                  توضیحات
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-white uppercase tracking-wider">
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
                  <td className="flex items-center gap-2 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    <img
                      src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                      alt="Product img"
                      width={50}
                      height={50}
                      className="py-1"
                    />
                    <div className="truncate">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.subcategory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {Number(product.price).toLocaleString()} تومان
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.brand}
                  </td>
                  <td className="line-clamp-1 px-6 text-sm text-gray-300">
                    {product.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button className="text-indigo-500 hover:text-indigo-300 mr-2">
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

   
        <div className="flex justify-center items-center gap-x-5 pt-4">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className={`text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 inline-flex items-center gap-2 ${
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
            className={`text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 inline-flex items-center gap-2 ${
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
