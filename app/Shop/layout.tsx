import Footer from "./shared/Footer";
import Header from "./shared/Header";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
    </div>
  );
}
