import fs from 'fs';
import path from 'path';

const folders = [
  'app/dashboard/admin/categories/[categoryId]',
  'app/dashboard/admin/subcategories/[subcategoryId]',
  'app/dashboard/admin/users/[userId]',
  'app/dashboard/admin/orders/[orderId]',
  'app/dashboard/admin/cart',
  'app/user/api',
  'app/products/[productId]',
  'app/categories/[categoryId]',
  'app/checkout',
  'app/auth/api',
  'app/error',
  'components',
  'hooks',
  'services',
  'store',
  'types',
  'utils',
  'public/images',
  'public/icons'
];

const files = [
  'app/layout.tsx',
  'app/globals.css',
  'app/page.tsx',
  'app/dashboard/layout.tsx',
  'app/dashboard/page.tsx',
  'app/dashboard/admin/layout.tsx',
  'app/dashboard/admin/page.tsx',
  'app/auth/login.tsx',
  'app/auth/register.tsx',
  'app/auth/api/auth-api.ts',
  'app/auth/api/token.ts',
  'app/error/ErrorHandler.tsx',
  'app/error/ToastProvider.tsx',
  'components/Button.tsx',
  'components/Input.tsx',
  'components/Navbar.tsx',
  'components/Sidebar.tsx',
  'components/Modal.tsx',
  'components/Toast.tsx',
  'hooks/useAuth.ts',
  'hooks/useToast.ts',
  'hooks/useAxios.ts',
  'services/api.ts',
  'services/axios-instance.ts',
  'services/order-service.ts',
  'services/cart-service.ts',
  'services/product-service.ts',
  'services/category-service.ts',
  'services/subcategory-service.ts',
  'store/index.ts',
  'store/authSlice.ts',
  'store/categorySlice.ts',
  'store/subcategorySlice.ts',
  'store/orderSlice.ts',
  'store/cartSlice.ts',
  'store/productSlice.ts',
  'types/user.ts',
  'types/product.ts',
  'types/category.ts',
  'types/subcategory.ts',
  'types/order.ts',
  'types/cart.ts',
  'utils/token.ts',
  'utils/role.ts',
  'utils/format.ts',
  'utils/cartUtils.ts'
];

// ایجاد پوشه‌ها
folders.forEach(folder => {
  fs.mkdirSync(path.resolve(folder), { recursive: true });
});

// ایجاد فایل‌ها
files.forEach(file => {
  fs.writeFileSync(path.resolve(file), '');
});

console.log('Project structure created successfully!');
