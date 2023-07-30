import BackButton from "@/components/back-btn";
import Brand_Products from "./brand.products";

export const generateMetadata = async ({
   params,
}: {
   params: { name: string };
}) => {
   return {
      title: params.name + " | فروشگاه اینترنتی",
   };
};

const Brand = ({ params }: { params: { name: string } }) => {
   const brandName = params.name;

   return (
      <div className="mx-4 my-8 space-y-7">
         <div className="flex justify-between items-center">
            <BackButton />
            <h1 className="text-center font-bold">{brandName}</h1>
            <span></span>
         </div>

         <Brand_Products brandName={brandName} />
      </div>
   );
};

export default Brand;
