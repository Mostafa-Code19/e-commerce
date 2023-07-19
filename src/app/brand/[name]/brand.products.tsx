'use client'

import axios, { AxiosError } from 'axios'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react'
import { Product, ProductLocation } from '@prisma/client'

import ProductCards from "@/components/product/cards";

type ProductLocationExtended = ProductLocation & { color: { color: string }, size: { size: number } }
type ProductExtended = Product & { gallery: { src: string, alt: string }[], productLocation: ProductLocationExtended[] }

const Brand_Products = ({ brandName }: { brandName: string}) => {
    const [brandProducts, setBrandProducts] = useState<ProductExtended[]>([])

    const fetchProducts = async () => {
        if (!brandName?.trim().length) return

        return await axios.post('/api/brand/product', { name: brandName })
            .then(res => {
                setBrandProducts(res.data.products)
            })
            .catch((err: AxiosError) => {
                toast.error(`دریافت محصولات به مشکل برخورد کرد!`);
                console.log('err fetch products', err)
            })
    }

    useEffect(() => {
        fetchProducts()
    }, [brandName])
    
    return (
        <ProductCards products={brandProducts} />
    );
}
 
export default Brand_Products;