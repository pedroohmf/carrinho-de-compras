'use client';

import { CartProvider } from "@/hooks/useCart";
import Header from '@/components/Header/page';
import GlobalStyles from '@/styles/global'
import { ToastContainer } from "react-toastify";
import Home from "../components/Home/page";

const Page = () => {
  return (
    <>
      <GlobalStyles/>
      <Header/>
      <Home />
      <ToastContainer autoClose={3000} />
    </>
    
  );
}
export default Page;


//! npx json-server db.json