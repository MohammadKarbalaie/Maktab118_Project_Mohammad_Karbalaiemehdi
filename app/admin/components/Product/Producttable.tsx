import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, ChangeEvent } from "react";
import Header from "../Header";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
}

const PRODUCT_DATA: Product[] = [
  { id: 1, name: "Wireless Earbuds", category: "Electronics", price: 59.99, stock: 143, sales: 1200 },
  { id: 2, name: "Leather Wallet", category: "Accessories", price: 39.99, stock: 89, sales: 800 },
  { id: 3, name: "Smart Watch", category: "Electronics", price: 199.99, stock: 56, sales: 650 },
  { id: 4, name: "Yoga Mat", category: "Fitness", price: 29.99, stock: 210, sales: 950 },
  { id: 5, name: "Coffee Maker", category: "Home", price: 79.99, stock: 78, sales: 720 },
];

const ProductsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCT_DATA);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = PRODUCT_DATA.filter(
      (product) =>
        product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className='flex-1 -mt-6 overflow-auto relative z-10'>
			<Header title='محصولات' />
    <motion.div
      className="bg-gray-900 backdrop-blur-md mt-6 shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">لیست محصولات</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="جستجوی محصولات ..."
            className="bg-gray-100 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <th className="px-6 py-3 text-start  text-xs font-medium text-white uppercase tracking-wider">
              دسته بندی
              </th>
              <th className="px-6 py-3 text-start  text-xs font-medium text-white uppercase tracking-wider">
              زیر دسته
              </th>
              <th className="px-6 py-3 text-start  text-xs font-medium text-white uppercase tracking-wider">
              برند
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-white uppercase tracking-wider">
              قیمت
              </th>
              <th className="px-6 py-3 text-xs text-start  font-medium text-white uppercase tracking-wider">
              تعداد
              </th>
              <th className="px-6 py-3 text-start  text-xs font-medium text-white uppercase tracking-wider">
                اقدامات
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                  <img
                    src="https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww"
                    alt="Product img"
                    className="size-10 rounded-full"
                  />
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.sales}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.sales}</td>
                <td className="px-6 py-4  whitespace-nowrap text-sm text-gray-300">
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
    </motion.div>
    <div>
      <button className="px-6 py-3 bg-gray-950
       text-white rounded-xl hover:bg-indigo-800
        hover:text-gray-100 transition duration-200"
      >ایجاد محصول جدید </button>
    </div>
    </div>
  );
};

export default ProductsTable;
