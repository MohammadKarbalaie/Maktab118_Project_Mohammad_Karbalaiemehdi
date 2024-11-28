import Footer from "../shared/Footer";
import Header from "../shared/Header";

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
