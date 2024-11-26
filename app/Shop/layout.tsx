

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      
      <div className="min-h-screen">
        {children}
      </div>
      
    </div>
  );
}
