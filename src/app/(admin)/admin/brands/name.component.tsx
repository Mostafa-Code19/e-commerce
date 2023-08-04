'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

const Name = ({ brand }: { brand: { id: string; name: string } }) => {
   const name = brand.name.charAt(0).toUpperCase() + brand.name.slice(1)

   const [currentName, setCurrentName] = useState(name)

   const changeName = async (e: React.FormEvent) => {
      e.preventDefault()

      const payload = {
         id: brand.id,
         name: currentName,
      }

      try {
         const res = await fetch('/api/brand', {
            method: 'PATCH',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         toast.success('نام برند با موفقیت تغییر کرد')
      } catch (err) {
         toast.error('در تغییر نام برند خطایی رخ داد')
         console.error(err)
      }
   }

   return (
      <form onSubmit={changeName} className='flex'>
         <input
            onChange={(e) => setCurrentName(e.target.value)}
            value={currentName}
            className='mr-3 w-full bg-transparent'
            type='text'
            placeholder='نام برند ...'
         />
      </form>
   )
}

export default Name
