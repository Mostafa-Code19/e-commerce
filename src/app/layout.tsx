"use client";

import SearchInput from "@/components/search";
import "./globals.scss";
import Navbar from "@/components/navbar";
import { CartContextProvider } from "@/context/provider/cart";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body>
            <SessionProvider>
               <CartContextProvider>
                  <header>
                     <SearchInput />
                  </header>

                  <ToastContainer
                     position="top-right"
                     autoClose={3000}
                     hideProgressBar={false}
                     newestOnTop={false}
                     closeOnClick
                     rtl
                     pauseOnFocusLoss
                     draggable
                     pauseOnHover
                     theme="light"
                  />

                  <main className="mb-24 max-w-screen-lg overflow-x-hidden mx-auto">
                     {children}
                  </main>

                  <Navbar />
               </CartContextProvider>
            </SessionProvider>
         </body>
      </html>
   );
}
