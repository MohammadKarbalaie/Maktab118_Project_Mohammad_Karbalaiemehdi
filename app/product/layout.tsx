import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`antialiased`}>
        <Header/>
        {children}
        <Footer/>   
    </div>
  );
}
