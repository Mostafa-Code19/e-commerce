"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Name = ({ brand }: { brand: { id: string; name: string } }) => {
   const name = brand.name.charAt(0).toUpperCase() + brand.name.slice(1);

   const [currentName, setCurrentName] = useState(name);

   const changeName = async (e: React.FormEvent) => {
      e.preventDefault();

      const payload = {
         id: brand.id,
         name: currentName,
      };

      try {
         const res = await axios.patch("/api/brand/rename", payload);
         if (res.status == 200) {
            toast.success("نام برند با موفقیت تغییر کرد");
         } else {
            toast.error("در تغییر نام برند خطایی رخ داد");
            console.log("api/brand/rename res not 200:", res);
         }
      } catch (err) {
         toast.error("در تغییر نام برند خطایی رخ داد");
         console.log("api/brand/rename err:", err);
      }
   };

   return (
      <form onSubmit={changeName} className="flex">
         <input
            onChange={(e) => setCurrentName(e.target.value)}
            value={currentName}
            className="mr-3 w-full"
            type="text"
            placeholder="نام برند ..."
         />
      </form>
   );
};

export default Name;
