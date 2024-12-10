import { useState, useEffect } from "react";
import { getAllProductsReq } from "../../../adminserver/services/products-services";
import { IProduct } from "./types";
import { Search } from "lucide-react";
import { GrPrevious, GrNext } from "react-icons/gr";

const ProductsTableToggle: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // State to track which field is being edited (either "quantity" or "price")
  const [editingField, setEditingField] = useState<"quantity" | "price" | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");

  // Fetch products from the API
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

  // Handle search input changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.subcategory.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  // Handle double click to start editing
  const handleDoubleClick = (field: "quantity" | "price", productId: string, currentValue: string | number) => {
    setEditingField(field);
    setEditingProductId(productId);
    setEditingValue(currentValue.toString());
  };

  // Save changes to quantity and price
  const handleSaveChanges = async () => {
    if (editingProductId && editingField && editingValue !== "") {
      const updatedData = { [editingField]: editingValue };
      try {
        const apiUrl = `http://localhost:8000/api/products/${editingProductId}`;
        const response = await fetch(apiUrl, {
          method: "PATCH", // Use PATCH instead of PUT
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
          throw new Error("Failed to update product");
        }
        const data = await response.json();
        console.log("Updated Product:", data);
        // Update the product locally after successful update
        setFilteredProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editingProductId ? { ...product, [editingField]: editingValue } : product
          )
        );
      } catch (error) {
        console.error("Error sending update request:", error);
      } finally {
        // Reset editing state
        setEditingField(null);
        setEditingProductId(null);
        setEditingValue("");
      }
    }
  };

  // Handle input field changes while editing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value);
  };

  return (
    <div className="flex-1 -mt-6 overflow-auto relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-900 backdrop-blur-md mx-auto mt-10 shadow-lg rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-100">لیست موجودی و قیمت</h2>
          <div className="relative w-full sm:w-auto">
            <div className="relative mt-2 sm:mt-0">
              <input
                type="text"
                placeholder="جستجوی محصولات ..."
                className="w-full sm:w-auto bg-gray-100 text-black placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSearch}
                value={searchTerm}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto min-w-full divide-y divide-gray-300 text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-start font-medium text-white uppercase tracking-wider">نام محصول</th>
                <th className="px-4 py-2 text-start font-medium text-white uppercase tracking-wider">تعداد</th>
                <th className="px-4 py-2 text-start font-medium text-white uppercase tracking-wider">قیمت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-100">{product.name}</td>
                  <td
                    className="px-4 py-2 whitespace-nowrap text-gray-300"
                    onDoubleClick={() => handleDoubleClick("quantity", product._id, product.quantity)}
                  >
                    {editingField === "quantity" && editingProductId === product._id ? (
                      <input
                        type="number"
                        value={editingValue}
                        onBlur={handleSaveChanges}
                        onChange={handleInputChange}
                        className="bg-gray-800 text-white rounded px-2 py-1 w-20"
                        autoFocus
                      />
                    ) : (
                      product.quantity
                    )}
                  </td>
                  <td
                    className="px-4 py-2 whitespace-nowrap text-gray-300"
                    onDoubleClick={() => handleDoubleClick("price", product._id, product.price)}
                  >
                    {editingField === "price" && editingProductId === product._id ? (
                      <input
                        type="number"
                        value={editingValue}
                        onBlur={handleSaveChanges}
                        onChange={handleInputChange}
                        className="bg-gray-800 text-white rounded px-2 py-1 w-20"
                        autoFocus
                      />
                    ) : (
                      `${Number(product.price).toLocaleString()} تومان`
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center gap-4 pt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded"
          >
            <GrNext className="text-lg" />
            قبلی
          </button>
          <p className="text-white">
            {page} | {totalPages}
          </p>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded"
          >
            
            بعدی
            <GrPrevious className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsTableToggle;
