/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { getAllProductsReq } from "../../../../../services/product-service";
import { Product } from "../../../../../types/product";
import { Search } from "lucide-react";
import { GrPrevious, GrNext } from "react-icons/gr";

const ProductsTableToggle: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [updatedProducts, setUpdatedProducts] = useState<Record<string, Partial<Product>>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [editingFields, setEditingFields] = useState<Record<string, Set<"quantity" | "price">>>({});

  const fetchProducts = async (currentPage: number) => {
    try {
      const response = await getAllProductsReq(currentPage, 6);
      const fetchedProducts = response.data.products;

      const mergedProducts = fetchedProducts.map((product) => ({
        ...product,
        ...updatedProducts[product._id],
      }));

      setProducts(mergedProducts);
      setFilteredProducts(mergedProducts);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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

  const handleDoubleClick = (productId: string, field: "quantity" | "price") => {
    setEditingFields((prev) => {
      const productFields = prev[productId] || new Set();
      productFields.add(field);
      return { ...prev, [productId]: productFields };
    });
  };

  const handleInputChange = (productId: string, field: "quantity" | "price", value: string) => {
    setFilteredProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, [field]: value } : product
      )
    );

    setUpdatedProducts((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], [field]: value },
    }));
  };

  const handleSaveChanges = async () => {
    const updates = Object.entries(updatedProducts).map(async ([productId, fields]) => {
      const apiUrl = `http://localhost:8000/api/products/${productId}`;
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });
      if (!response.ok) {
        throw new Error(`Failed to update product with ID: ${productId}`);
      }
      return response.json();
    });

    try {
      await Promise.all(updates);
      setEditingFields({});
      setUpdatedProducts({});
    } catch (error) {
      console.error("Error saving changes:", error);
    }
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
                    onDoubleClick={() => handleDoubleClick(product._id, "quantity")}
                  >
                    {editingFields[product._id]?.has("quantity") ? (
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => handleInputChange(product._id, "quantity", e.target.value)}
                        className="bg-gray-800 text-white rounded px-2 py-1 w-20"
                      />
                    ) : (
                      product.quantity
                    )}
                  </td>
                  <td
                    className="px-4 py-2 whitespace-nowrap text-gray-300"
                    onDoubleClick={() => handleDoubleClick(product._id, "price")}
                  >
                    {editingFields[product._id]?.has("price") ? (
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) => handleInputChange(product._id, "price", e.target.value)}
                        className="bg-gray-800 text-white rounded px-2 py-1 w-20"
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

        <div className="pt-6">
          <button
            onClick={handleSaveChanges}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold"
          >
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsTableToggle;
