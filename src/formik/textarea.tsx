import { useField } from 'formik'

// @ts-ignore
const FormikTextarea = ({ label, ...props }) => {
   // @ts-ignore
   const [field, meta] = useField(props)

   return (
      <div className='text-right'>
         <label>
            <h6>{label}</h6>
         </label>
         <textarea
            {...field}
            {...props}
            rows={3}
            className='whitespace-pre w-full px-4 py-2 rtl rounded-xl'
         />
         {meta.error && meta.touched ? <p className='text-sm text-red-500'>{meta.error}</p> : ''}
      </div>
   )
}

export default FormikTextarea
