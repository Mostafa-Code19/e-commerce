import { useState, useMemo } from 'react'
import Image from 'next/legacy/image'
import Button from '@mui/material/Button'
import { toast } from 'react-toastify'
import axios from 'axios'

const ImageInput = ({ selectedProduct }: { selectedProduct: string | null }) => {
   const [productImages, setProductImages] = useState<File[] | null>(null)
   const [loading, setLoading] = useState(false)

   const productImagesMemo = useMemo(() => {
      return productImages && Object.values(productImages)
   }, [productImages])

   const onSubmit = async () => {
      if (!productImages || !productImagesMemo) {
         return toast.warning('هیچ تصویری برای آپلود انتخاب نشده است!')
      }
      if (!selectedProduct) {
         return toast.warning('محصول مورد نظر جهت آپلود تصویر انتخاب نشده است!')
      }

      setLoading(true)

      try {
         for (const image of productImagesMemo) {
            const imageName = image.name

            const resS3 = await axios.post('/api/product/image/create/s3', {
               imageName,
            })

            if (resS3.status === 200) {
               const { key, uploadUrl } = resS3.data
               const putRes = await axios.put(uploadUrl, image)

               if (putRes.status === 200) {
                  const payload = {
                     key,
                     productId: selectedProduct,
                     imageName,
                  }
                  const resDB = await axios.post('/api/product/image/create/db', payload)

                  if (resDB.status === 200) {
                     setProductImages(null)
                     toast.success(`تصویر ${imageName} با موفقیت آپلود شد.`)
                  } else {
                     // ! delete the object from s3
                     toast.error(`در آپلود تصویر ${imageName} خطایی رخ داد!`)
                     console.log('api/product/image/create/db !200', resDB)
                  }
               } else {
                  toast.error(`در آپلود تصویر ${imageName} خطایی رخ داد!`)
                  console.log('axios.put !200', putRes)
               }
            } else {
               toast.error(`در آپلود تصویر ${imageName} خطایی رخ داد!`)
               console.log('api/product/image/add res not 200', resS3)
            }
         }
      } catch (error) {
         if (
            // @ts-ignore
            error.message === 'Network Error' ||
            // @ts-ignore
            error.message === '"timeout exceeded"'
         ) {
            console.log('network error', error)
            toast.error(
               'در اتصال اینترنت شما خطایی رخ داد. (اگر از VPN استفاده می‌کنید لطفا ابتدا آن را خاموش کنید)',
            )
         } else {
            toast.error('در آپلود تصویر خطایی رخ داد!')
            console.log('api/product/image/add', error)
         }
      } finally {
         setLoading(false)
      }
   }

   const checkIfFilesAreTooBig = (files: File[]): { valid: boolean; invalidFile: File | null } => {
      let valid = true
      let invalidFile = null

      files.map((file) => {
         const size = file.size / 1024 / 1024 // ex: 0.4 MB

         if (size > 0.3) {
            invalidFile = file
            valid = false
         }
      })

      return { valid, invalidFile }
   }

   const checkIfFilesAreCorrectType = (
      files: File[],
   ): { valid: boolean; invalidFile: File | null } => {
      let valid = true
      let invalidFile = null

      files.map((file) => {
         if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            invalidFile = file
            valid = false
         }
      })

      return { valid, invalidFile }
   }

   // @ts-ignore
   const onChange = (e) => {
      const files = e?.target?.files

      if (!files) return

      const filesList: File[] = Object.values(files)

      const typeCheckRes: { invalidFile: File | null; valid: boolean } =
         checkIfFilesAreCorrectType(filesList)

      if (!typeCheckRes.valid && typeCheckRes.invalidFile)
         return toast.warning(
            `تایپ فایل ${typeCheckRes.invalidFile.name} می‌بایست png, jpeg یا webp باشد`,
         )

      const sizeCheckRes: { invalidFile: File | null; valid: boolean } =
         checkIfFilesAreTooBig(filesList)

      if (!sizeCheckRes.valid && sizeCheckRes.invalidFile) {
         const fileSize = Math.round(sizeCheckRes.invalidFile.size / 1024 / 1024)
         toast.warning(
            `سایز فایل ${sizeCheckRes.invalidFile.name} برابر با ${fileSize} مگابایت می‌باشد. حداکثر هر فایل می‌بایست ۰.۳ مگابایت باشد`,
         )
         return
      }

      setProductImages(files)
   }

   return (
      <div>
         <h1 className='text-center'>افزودن تصاویر</h1>

         <div className='flex items-center my-3 justify-around'>
            <div className='px-3 border border-green-500 rounded hover:text-black hover:bg-green-500'>
               {loading ? (
                  <div className='px-5'>
                     <svg
                        aria-hidden='true'
                        className='w-6 h-6 my-2 text-gray-200 animate-spin dark:text-white fill-green-700'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                     >
                        <path
                           d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                           fill='currentColor'
                        />
                        <path
                           d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                           fill='currentFill'
                        />
                     </svg>
                  </div>
               ) : (
                  <button onClick={onSubmit} className='flex space-x-3 items-center'>
                     <h5>آپلود</h5>
                     <svg
                        className='h-6 w-6 text-black'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                     >
                        {' '}
                        <path stroke='none' d='M0 0h24v24H0z' />{' '}
                        <path d='M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1' />{' '}
                        <polyline points='9 15 12 12 15 15' />{' '}
                        <line x1='12' y1='12' x2='12' y2='21' />
                     </svg>
                  </button>
               )}
            </div>

            <Button variant='outlined' component='label' sx={{ width: '70%' }}>
               <h5>انتخاب تصاویر</h5>
               <input
                  hidden
                  accept='image/*'
                  type='file'
                  name='productImage'
                  onChange={onChange}
                  multiple
                  disabled={loading}
               />
            </Button>
         </div>

         <div className='mt-3'>
            {productImagesMemo &&
               productImagesMemo.map((imageData: File) => {
                  return (
                     <Image
                        className='object-contain'
                        key={imageData.name}
                        src={URL.createObjectURL(imageData)}
                        alt={imageData.name}
                        width={300}
                        height={200}
                        layout='responsive'
                     />
                  )
               })}
         </div>
      </div>
   )
}

export default ImageInput
