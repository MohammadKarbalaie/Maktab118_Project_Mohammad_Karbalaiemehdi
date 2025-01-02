'use client'
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { store } from "../../app/redux/store";
import { Provider } from "react-redux";
export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`antialiased h-screen` }>
        <Provider store={store}>
        <Header/>
        {children}
        <Footer/>
        </Provider>

    </div>
  );
}
