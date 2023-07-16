'use client'

import BackButton from "@/components/back-btn";
import axios, { AxiosError } from "axios";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { Product, ProductLocation } from '@prisma/client'
import ProductCards from "@/components/product/cards";

type ProductLocationExtended = ProductLocation & { color: { color: string }, size: { size: number } }
type ProductExtended = Product & { gallery: { src: string, alt: string }[], productLocation: ProductLocationExtended[] }

const Search = () => {
    const [searchResult, setSearchResult] = useState<ProductExtended[]>([])

    const router = useSearchParams();
    const query = router.get('query')

    const fetchProducts = async () => {
        if (!query?.trim().length) return

        return await axios.post('/api/search', { title: query })
            .then(res => {
                setSearchResult(res.data)
            })
            .catch((err: AxiosError) => {
                toast.error(`دریافت محصولات به مشکل برخورد کرد!`);
                console.log('err fetch products', err)
            })
    }

    useEffect(() => {
        fetchProducts()
    }, [query])

    return (
        <div className='mx-4 my-8 space-y-7'>
            <div className='flex justify-between items-center'>
                <BackButton />
                <h1 className='text-center font-bold'>{query}</h1>
                <span></span>
            </div>
            <ProductCards products={searchResult} />
        </div>
    );
}

export default Search;