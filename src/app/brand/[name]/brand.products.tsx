'use client'

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

      const payload = { name: brandName }

      try {
         const res = await fetch('/api/brand/product', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         const resData = await res.json()

         setBrandProducts(resData.products)
         toast.success('تغییرات با موفقیت ثبت گردید.')
      } catch (err) {
         toast.error('دریافت محصولات به مشکل برخورد کرد!')
         console.error(err)
      }
   }, [brandName])

   useEffect(() => {
      fetchProducts()
   }, [fetchProducts])

   return <ProductCards products={brandProducts} pageTarget='/product/' userTarget='client' />
}

export default BrandProducts
