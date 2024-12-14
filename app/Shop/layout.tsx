import { CartProvider } from "./context/CartContext";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`antialiased`}>
      <CartProvider>
      {children}
      </CartProvider>
    </div>
  );
}
