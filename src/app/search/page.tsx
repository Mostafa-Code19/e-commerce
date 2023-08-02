'use client'

import BackButton from '@/components/back-btn'
import axios from 'axios'

import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Product, ProductLocation } from '@prisma/client'
import ProductCards from '@/components/product/cards'

type ProductLocationExtended = ProductLocation & {
   color: { color: string }
   size: { size: number }
}
type ProductExtended = Product & {
   gallery: { src: string; alt: string }[]
   productLocation: ProductLocationExtended[]
}

const Search = () => {
   const [searchResult, setSearchResult] = useState<ProductExtended[]>([])

   const router = useSearchParams()
   const query = router.get('query')

   const fetchProducts = useCallback(async () => {
      if (!query?.trim().length) return

      try {
         const res = await axios.post('/api/search', { title: query })
         if (res.status == 200) return setSearchResult(res.data)
         else {
            toast.error('دریافت محصولات به مشکل برخورد کرد!')
            return console.log('api/search res not 200', res)
         }
      } catch (err) {
         toast.error('دریافت محصولات به مشکل برخورد کرد!')
         console.log('api/search err', err)
      }
   }, [query])

   useEffect(() => {
      document.title = 'Search | فروشگاه اینترنتی'
      fetchProducts()
   }, [fetchProducts])

   return (
      <>
         <div className='mx-4 my-8 space-y-7'>
            <div className='flex justify-between items-center'>
               <BackButton />
               <h1 className='text-center font-bold'>{query}</h1>
               <span></span>
            </div>
            <ProductCards products={searchResult} pageTarget='/product/' userTarget='client' />
         </div>
      </>
   )
}

export default Search
