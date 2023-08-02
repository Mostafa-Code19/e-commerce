import { useField } from 'formik'

// @ts-ignore
const FormikTextarea = ({ label, ...props }) => {
   // @ts-ignore
   const [field, meta] = useField(props)

   return (
      <div className='mb-6 text-right space-y-2'>
         <label>{label}</label>
         <textarea {...field} {...props} rows={3} className='w-full px-6 py-1 rtl rounded-lg' />
         {meta.error && meta.touched ? <p className='text-sm text-red-500'>{meta.error}</p> : ''}
      </div>
   )
}

export default FormikTextarea
