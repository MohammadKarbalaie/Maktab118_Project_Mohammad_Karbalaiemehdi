'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { initializeCart, setUser } from '../redux/slices/cartSlice'
import { getUserFromCookie, isUserLoggedIn } from '../../utils/cookieUtils'

export function CartInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const cartStatus = useSelector((state: RootState) => state.cart.status)
  const user = useSelector((state: RootState) => state.cart.user)

  useEffect(() => {
    if (isUserLoggedIn()) {
      const userData = getUserFromCookie();
      if (userData) {
        dispatch(setUser(userData));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (cartStatus === 'idle') {
      dispatch(initializeCart());
    }
  }, [dispatch, cartStatus, user]);

  return <>{children}</>;
}

