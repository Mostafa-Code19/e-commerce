'use client'

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
         const res = await fetch('/api/search', {
            method: 'POST',
            body: JSON.stringify({ title: query }),
         })

         if (!res.ok) throw new Error()

         const resData = await res.json()

         setSearchResult(resData)
      } catch (err) {
         toast.error('دریافت محصولات به مشکل برخورد کرد!')
         console.error(err)
      }
   }, [query])

   useEffect(() => {
      document.title = 'Search | تبریزیان ایکامرس'
      fetchProducts()
   }, [fetchProducts])

   return (
      <>
         <div className='mx-6 md:mx-auto max-w-screen-md my-8 space-y-16'>
            <h1 className='text-center font-bold'>{query}</h1>
            <ProductCards products={searchResult} pageTarget='/product/' userTarget='client' />
         </div>
      </>
   )
}

export default Search
