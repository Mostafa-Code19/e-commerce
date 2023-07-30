import Image from "next/legacy/image";
import Link from "next/link";

import prisma from "@/lib/prisma";
import ProductCards from "@/components/product/cards";
import { Product, ProductLocation } from "@prisma/client";

type ProductLocationExtended = ProductLocation & {
   color: { color: string };
   size: { size: number };
};
type ProductExtended = Product & {
   gallery: { src: string; alt: string }[];
   productLocation: ProductLocationExtended[];
};

async function getProducts() {
   return await prisma.product
      .findMany({
         include: {
            productLocation: {
               where: {
                  public: {
                     equals: true,
                  },
                  quantity: {
                     gt: 0,
                  },
               },
               include: {
                  color: {
                     select: {
                        color: true,
                     },
                  },
                  size: {
                     select: {
                        size: true,
                     },
                  },
               },
            },
            gallery: {
               select: {
                  src: true,
                  alt: true,
               },
            },
         },
      })
      .then((res: ProductExtended[]) => res);
}

export const metadata = {
   title: "فروشگاه اینترنتی",
   description: "https://github.com/Mostafa-Code19",
};

async function Home() {
   const products = await getProducts();

   return (
      <div className="mx-8 my-16">
         <Link href="#">
            <div className="from-blue-400 to-blue-700 w-full bg-gradient-to-r rounded-3xl">
               <div className="flex max-w-screen-sm relative justify-around mb-16 mx-auto">
                  <div className="py-8">
                     <h1 className="max-w-[70%] text-white items-center mb-4 mr-2 text-right">
                        آیا آماده ای که مسیر رو هدایت کنی
                     </h1>
                     <button className="bg-white rounded-2xl text-blue-600 px-4 py-2">
                        مشاهده
                     </button>
                  </div>
                  <div className="relative">
                     <div className="w-[260px] h-[260px] absolute -right-20 -top-12">
                        <Image
                           priority
                           className="object-contain"
                           src="/hero.png"
                           alt="nike shoe"
                           width="260"
                           height="260"
                           layout="responsive"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </Link>

         <div className="mb-8">
            <div className="my-10 space-y-5">
               <div className="flex justify-center space-x-3">
                  <Link href="/brand/nike">
                     <div className="px-6 py-2 text-center rounded-xl bg-white">
                        نایک
                     </div>
                  </Link>
                  <Link href="/brand/adidas">
                     <div className="px-6 py-2 text-center rounded-xl bg-white">
                        آدیداس
                     </div>
                  </Link>
                  <Link href="/brand/puma">
                     <div className="px-6 py-2 text-center rounded-xl bg-white">
                        پوما
                     </div>
                  </Link>
                  <Link href="/brand/skechers">
                     <div className="px-6 py-2 text-center rounded-xl bg-white">
                        اسکیچرز
                     </div>
                  </Link>
               </div>
            </div>

            <div className="flex items-center justify-between mb-8">
               <button
                  disabled
                  className="flex items-center space-x-1 space-x-reverse"
               >
                  <span className="text-sm text-gray-400">نمایش همه</span>
               </button>
               <h2>جدیدترین ها</h2>
            </div>

            <ProductCards products={products} pageTarget="/product/" />
         </div>
      </div>
   );
}

export default Home;
