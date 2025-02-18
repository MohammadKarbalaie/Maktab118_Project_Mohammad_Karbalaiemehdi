'use client'
import { store } from "../../../app/redux/store";
import { Provider } from "react-redux";

export default function UserLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div>
        <Provider store={store}>
        {children}
        </Provider>
      </div>
      
    );
  }
  