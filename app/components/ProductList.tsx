'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, addToCart, updateProductQuantity, incrementCartItem, Product, syncCartWithDatabase } from '../redux/slices/cartSlice'
import { AppDispatch, RootState } from '../redux/store'
import Link from 'next/link'
import { BiBasket } from 'react-icons/bi'

const defaultProduct: Product = {
  _id: "",
  name: "نامشخص",
  price: 0,
  quantity: 0,
  images: [],
  category: '',
  subcategory: '',
  brand: '',
  description: '',
  thumbnail: ''
}

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: RootState) => state.cart.products)
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const status = useSelector((state: RootState) => state.cart.status)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const productsPerPage = 9

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  useEffect(() => {
    setTotalPages(Math.ceil(products.length / productsPerPage))
  }, [products])

  const handleAddToCart = (product: Product) => {
    if (product.quantity > 0) {
      dispatch(addToCart(product));
      dispatch(syncCartWithDatabase());
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.length > 0 
  ? products.slice(indexOfFirstProduct, indexOfLastProduct)
  : [];

  if (status === 'loading') {
    return <div className="text-center py-20">در حال بارگذاری محصولات...</div>
  }

  if (status === 'failed') {
    return <div className="text-center py-20 text-red-500">خطا در بارگذاری محصولات. لطفاً صفحه را رفرش کنید.</div>
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-3xl min-[400px]:text-4xl text-black mb-8 max-lg:text-center">
          همه محصولات
        </h2>
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {currentProducts.map((product) => {
              const validProduct = { ...defaultProduct, ...product }
              const cartItem = cartItems.find(item => item._id === validProduct._id)
              return (
                <div
                  key={validProduct._id}
                  className="max-w-[500px] border-2 py-3 rounded-xl mx-auto group relative"
                >
                  <Link href={`/product/${validProduct._id}`} passHref>
                    <div className="w-full overflow-hidden rounded-md">
                      <div className="relative w-full h-[18rem] group-hover:scale-110 transition-all duration-300 rounded-md overflow-hidden">
                        <img
                          src={`http://localhost:8000/images/products/images/${validProduct.images[0]}`}
                          alt={validProduct.name}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    </div>
                  </Link>
                  <div className="my-2 space-y-1 p-4">
                    <h3 className="text-xl font-bold capitalize hover:text-green-500">
                      {validProduct.name.slice(0, 45)}
                      {validProduct.name.length > 45 && "..."}
                    </h3>
                    <div className="flex justify-between">
                      <div className="text-lg font-bold space-x-3 flex gap-2">
                        <span className="text-muted-foreground flex gap-1">
                          <p>تومان</p>
                          {validProduct.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="group-hover:block">
                        <button
                          onClick={() => handleAddToCart(validProduct)}
                          className="p-2 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-sm transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-100"
                          disabled={validProduct.quantity === 0}
                        >
                          <BiBasket className="text-gray-400 text-2xl" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">موجودی: {validProduct.quantity}</p>
                    {cartItem && (
                      <p className="text-sm text-blue-500">تعداد در سبد خرید: {cartItem.cartQuantity}</p>
                    )}
                  </div>
                </div>
              )
            })}
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

