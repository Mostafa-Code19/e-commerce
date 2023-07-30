import BackButton from "@/components/back-btn";
import User from "@/lib/user";
import Image from "next/legacy/image";

import { User as UserType, Order } from "@prisma/client";
import DateFormat from "@/components/dateFormat";

type UserAndOrders = UserType & { orders?: OrderAndItems[] };
type UserWithoutPasswordAndOrders = Omit<UserAndOrders, "password">;
type OrderAndItems = Order & {
   items: {
      id: string;
      item: {
         product: {
            gallery: {
               src: string;
               alt: string;
            }[];
         };
      };
      quantity: number;
   }[];
};

export const metadata = {
   title: "فروشگاه اینترنتی | سفارش های من",
};

const Orders = async () => {
   const user: UserWithoutPasswordAndOrders | null = await User();

   const status = (status: string) => {
      if (status == "CANCELED") return "❌ لغو شده ";
      if (status == "POSTED") return "✅ ارسال شده";
      if (status == "PREPARING") return "📦 در حال آماده سازی";
      if (status == "PENDING") return "🛎️ در حال پردازش";
   };

   return (
      <div className="mx-8 my-16 space-y-7">
         <div className="flex justify-between items-center">
            <BackButton />
            <h1 className="text-center font-bold">سفارش های من</h1>
            <span></span>
         </div>

         {user ? (
            user.orders?.length ? (
               user.orders.reverse().map((order) => {
                  return (
                     <div
                        key={order.id}
                        className="px-4 py-10 space-y-2 bg-zinc-100 rounded-xl max-w-md mx-auto"
                     >
                        <div className="text-right">
                           <span>{status(order.status)}</span>
                        </div>
                        <div className="text-right space-y-2">
                           <div>
                              <span>{DateFormat(order.created_at)}</span>
                           </div>
                           <div className="space-x-2">
                              <span className="text-black font-semibold">
                                 {order.id}
                              </span>
                              <span>کد سفارش</span>
                           </div>
                           {order.tracking_code ? (
                              <div className="space-x-2">
                                 <span className="text-black font-semibold">
                                    {order.tracking_code}
                                 </span>
                                 <span>کد رهگیری پستی</span>
                              </div>
                           ) : (
                              ""
                           )}
                           <div className="space-x-2 flex justify-end">
                              <span className="text-black font-semibold toman_card">
                                 {order.price.toLocaleString()}
                              </span>
                              <span>مبلغ</span>
                           </div>
                           {order.discount ? (
                              <div className="space-x-2 flex justify-end">
                                 <span className="text-black font-semibold toman_card">
                                    {order.discount.toLocaleString()}
                                 </span>
                                 <span>تخفیف</span>
                              </div>
                           ) : (
                              ""
                           )}
                        </div>
                        <hr />
                        <div className="flex space-x-3 justify-end">
                           {order.items.map(
                              (item: OrderAndItems["items"][0]) => {
                                 return (
                                    <div
                                       key={item.id}
                                       className="relative w-fit"
                                    >
                                       <Image
                                          className="object-contain"
                                          src={item.item.product.gallery[0].src}
                                          alt={item.item.product.gallery[0].alt}
                                          width="100"
                                          height="70"
                                       />

                                       <span
                                          style={{ fontSize: ".6rem" }}
                                          className="absolute left-0 bottom-0 p-1 px-2 bg-slate-200 rounded-md text-black"
                                       >
                                          {item.quantity}
                                       </span>
                                    </div>
                                 );
                              }
                           )}
                        </div>
                     </div>
                  );
               })
            ) : (
               <h3 className="text-center">
                  !شما تا به این لحظه هیچ سفارشی ثبت نکرده اید
               </h3>
            )
         ) : (
            <h3 className="text-center">ابتدا می‌بایست وارد شوید.</h3>
         )}
      </div>
   );
};

export default Orders;
