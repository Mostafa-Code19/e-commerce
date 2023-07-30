"use client";

import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { OrderExtended } from "./page";
import axios from "axios";

const OrderStatus = ({ order }: { order: OrderExtended }) => {
   const [status, setStatus] = useState(String(order.status));

   const handleChangeStatus = async (event: SelectChangeEvent) => {
      const updatedStatus = event.target.value;

      const payload = {
         id: order.id,
         updatedStatus: updatedStatus,
      };

      try {
         const res = await axios.patch("/api/order/update/status", payload);
         if (res.status == 200 && res.data.order)
            setStatus(updatedStatus as string);
         else console.log("res update status not 200", res);
      } catch (err) {
         console.log("err update status", err);
      }
   };

   return (
      <Select value={status} onChange={handleChangeStatus}>
         <MenuItem value="PENDING">ثبت اولیه</MenuItem>
         <MenuItem value="PREPARING">در حال آماده سازی</MenuItem>
         <MenuItem value="POSTED">ارسال شده</MenuItem>
         <MenuItem value="CANCELED">کنسل شده</MenuItem>
      </Select>
   );
};

export default OrderStatus;
