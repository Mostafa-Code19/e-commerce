'use client'

import axios from 'axios'
import { toast } from 'react-toastify'
import { useState, useEffect, useCallback } from 'react'
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

const BrandProducts = ({ brandName }: { brandName: string }) => {
   const [brandProducts, setBrandProducts] = useState<ProductExtended[]>([])

   const fetchProducts = useCallback(async () => {
      if (!brandName?.trim().length) return

      const res = await axios.post('/api/brand/product', { name: brandName })

      try {
         if (res.status == 200) return setBrandProducts(res.data.products)
         else {
            toast.error('دریافت محصولات به مشکل برخورد کرد!')
            return console.log('api/brand/products res not 200', res)
         }
      } catch (err) {
         toast.error('دریافت محصولات به مشکل برخورد کرد!')
         return console.log('err fetch products', err)
      }
   }, [brandName])

   useEffect(() => {
      fetchProducts()
   }, [fetchProducts])

   return <ProductCards products={brandProducts} pageTarget='/product/' userTarget='client' />
}

export default BrandProducts
