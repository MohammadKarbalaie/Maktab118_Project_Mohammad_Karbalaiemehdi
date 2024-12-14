import AdminGuard from "./components/AdminGuard";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
     <AdminGuard>
    {children}
    </AdminGuard> 
    </div>
  );
}
