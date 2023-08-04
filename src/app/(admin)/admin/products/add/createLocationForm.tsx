import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'

import LocationSchemaValidation from '@/formik/schema/location'
import FormikInput from '@/formik/input'
import { Switch } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const CreateLocationForm = ({ selectedProduct }: { selectedProduct: string | null }) => {
   const onSubmit = async (values: {
      publicState: boolean
      price: number | null
      discount: number | null
      size: number | null
      quantity: number | null
      color: string
   }) => {
      const payload = { ...values, productId: selectedProduct }

      if (!selectedProduct) return toast.warning('هیچ محصولی انتخاب نشده است!')

      try {
         const res = await fetch('/api/product/location', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         toast.success('چهره جدید محصول با موفقیت اضافه شد.')
      } catch (err) {
         toast.error('در ثبت چهره جدید محصول خطایی رخ داد!')
         console.error(err)
      }
   }

   return (
      <Formik
         initialValues={{
            publicState: true,
            price: null,
            discount: null,
            size: null,
            quantity: null,
            color: '',
         }}
         validationSchema={LocationSchemaValidation}
         onSubmit={onSubmit}
      >
         {({ isSubmitting, handleChange, setFieldValue, errors, touched }) => (
            <Form className='space-y-5'>
               <h1 className='text-center'>افزودن چهره</h1>

               <div className='flex justify-end'>
                  <Switch defaultChecked name='publicState' onChange={handleChange} />
               </div>

               <FormikInput label='قیمت' name='price' type='number' placeholder='قیمت به تومان' />
               <FormikInput
                  label='تخفیف'
                  name='discount'
                  type='number'
                  placeholder='تخفیف به درصد'
               />
               <FormikInput label='سایز' name='size' type='number' placeholder='سایز' />
               <FormikInput
                  label='تعداد موجود'
                  name='quantity'
                  type='number'
                  placeholder='تعداد موجود'
               />

               <div className='flex justify-between space-x-3 items-center'>
                  <Autocomplete
                     id='color'
                     options={[
                        { id: 'سفید', value: 'WHITE' },
                        { id: 'مشکی', value: 'BLACK' },
                        { id: 'زرد', value: 'YELLOW' },
                        { id: 'نارنجی', value: 'ORANGE' },
                        { id: 'قرمز', value: 'RED' },
                        { id: 'قهوه ای', value: 'BROWN' },
                        { id: 'بنفش', value: 'PURPLE' },
                        { id: 'سرمه ای', value: 'DARKBLUE' },
                        { id: 'آبی', value: 'BLUE' },
                        { id: 'آبی روشن', value: 'LIGHTBLUE' },
                        { id: 'سبز', value: 'GREEN' },
                        { id: 'سبز روشن', value: 'YELLOWGREEN' },
                     ]}
                     onChange={(e, color) => {
                        if (color) setFieldValue('color', color.value)
                     }}
                     getOptionLabel={(option) => option.id}
                     renderInput={(params) => <TextField {...params} label='رنگ' />}
                     sx={{ width: '100%' }}
                  />

                  <h5 className='w-1/2 text-center'>رنگ چهره محصول</h5>
               </div>

               {errors.color && touched.color ? (
                  <p className='text-sm text-red-500'>{errors.color}</p>
               ) : (
                  ''
               )}

               <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full px-5 py-3 mt-10 bg-green-500 shadow-lg shadow-green-300 rounded text-white'
               >
                  {isSubmitting ? (
                     <div className='flex justify-center'>
                        <CircularProgress color='success' size={25} />
                     </div>
                  ) : (
                     'افزودن'
                  )}
               </button>
            </Form>
         )}
      </Formik>
   )
}

export default CreateLocationForm
