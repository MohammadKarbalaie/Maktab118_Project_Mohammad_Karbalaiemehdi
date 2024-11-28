import Footer from "../shared/Footer";
import Header from "../shared/Header";

export default function CheckoutLayout({
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
