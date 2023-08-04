import { useState, useMemo } from 'react'
import Image from 'next/legacy/image'
import Button from '@mui/material/Button'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress'

const ImageInput = ({ selectedProduct }: { selectedProduct: string | null }) => {
   const [productImages, setProductImages] = useState<File[] | null>(null)
   const [loading, setLoading] = useState(false)

   const productImagesMemo = useMemo(() => {
      return productImages && Object.values(productImages)
   }, [productImages])

   const createS3 = async (imageName: string) => {
      try {
         const res = await fetch('/api/product/image/s3', {
            method: 'POST',
            body: JSON.stringify({
               imageName,
            }),
         })

         if (!res.ok) throw new Error()

         return res
      } catch (err) {
         toast.error('در ایجاد لینک باکِت خطایی رخ داد. لطفا مجدد تلاش کنید.')
         console.error(err)
      }
   }

   const putInS3 = async (uploadUrl: string, image: File) => {
      try {
         const res = await fetch(uploadUrl, {
            method: 'PUT',
            body: image,
         })

         if (!res.ok) throw new Error()

         return res
      } catch (err) {
         toast.error('در آپلود عکس خطایی رخ داد. لطفا مجدد تلاش کنید.')
         console.error(err)
      }
   }

   const createDbData = async (key: string, imageName: string) => {
      const payload = {
         key,
         productId: selectedProduct,
         imageName,
      }

      try {
         const res = await fetch('/api/product/image/db', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         setProductImages(null)
         toast.success(`تصویر ${imageName} با موفقیت آپلود شد.`)
      } catch (err) {
         // ! delete the object from s3
         toast.error(`در آپلود تصویر ${imageName} خطایی رخ داد!`)
         console.error(err)
      }
   }

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

            const s3SignedUrl = await createS3(imageName)

            if (!s3SignedUrl) throw new Error('s3 signed url')

            const { key, uploadUrl } = await s3SignedUrl.json()

            const fileUploadResult = await putInS3(uploadUrl, image)

            if (!fileUploadResult) throw new Error('file upload to s3')

            await createDbData(key, imageName)
         }
      } catch (error) {
         toast.error(
            'در آپلود تصویر خطایی رخ داد. (اگر از VPN استفاده می‌کنید لطفا ابتدا آن را خاموش کنید)',
         )
         console.error(error)
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
         const fileSize = Math.round((sizeCheckRes.invalidFile.size / 1024 / 1024) * 1000)
         toast.warning(
            `سایز فایل ${sizeCheckRes.invalidFile.name} برابر با ${fileSize} کیلوبایت می‌باشد. حداکثر هر فایل می‌بایست 300 کیلوبایت باشد`,
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
                  <div className='px-5 mt-1'>
                     <CircularProgress color='success' size={20} />
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
