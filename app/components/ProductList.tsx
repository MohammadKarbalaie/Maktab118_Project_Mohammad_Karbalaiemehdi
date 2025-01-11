/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, syncCartWithDatabase } from '../redux/slices/cartSlice'
import { AppDispatch, RootState } from '../redux/store'
import Link from 'next/link'
import { BiBasket } from 'react-icons/bi'
import { getAllProductsReq } from '@/services/product-service'
import { Product } from '@/types/product'

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const productsPerPage = 9

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProductsReq(currentPage, productsPerPage)
        setProducts(response.data.products)
        setTotalPages(response.total_pages)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [currentPage])

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
    dispatch(syncCartWithDatabase())
  }

  if (products.length === 0) {
    return <div className="text-center py-20">در حال بارگذاری محصولات...</div>
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-3xl min-[400px]:text-4xl text-black mb-8 max-lg:text-center">
          همه محصولات
        </h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="max-w-[500px] border-2 py-3 rounded-xl mx-auto group relative"
              >
                <Link href={`/product/${product._id}`} passHref>
                  <div className="w-full overflow-hidden rounded-md">
                    <div className="relative w-full h-[18rem] group-hover:scale-110 transition-all duration-300 rounded-md overflow-hidden">
                      <img
                        src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                        alt={product.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </Link>
                <div className="my-2 space-y-1 p-4">
                  <h3 className="text-xl font-bold capitalize hover:text-green-500">
                    {product.name.slice(0, 45)}
                    {product.name.length > 45 && "..."}
                  </h3>
                  <div className="flex justify-between">
                    <div className="text-lg font-bold space-x-3 flex gap-2">
                      <span className="text-muted-foreground flex gap-1">
                        <p>تومان</p>
                        {product.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="group-hover:block">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="p-2 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-sm transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-100"
                        disabled={product.quantity === 0}
                      >
                        <BiBasket className="text-gray-400 text-2xl" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">موجودی: {product.quantity}</p>
                  {cartItems.find(item => item._id === product._id) && (
                    <p className="text-sm text-blue-500">تعداد در سبد خرید: {cartItems.find(item => item._id === product._id)?.cartQuantity}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-20">محصولی برای نمایش وجود ندارد.</p>
        )}

        {totalPages > 0 && (
          <div className="flex items-center justify-center mt-10">
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              قبلی
            </button>
            <span className="mx-4">
              صفحه {currentPage} از {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              بعدی
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductList

