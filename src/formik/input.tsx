import { useField } from 'formik';

const FormikInput = ({ label, ...props }: any) => {
   const [field, meta] = useField(props);

   return (
      <div className="mb-6 text-right space-y-2">
         <label>{label}</label>
         <input
            {...field}
            {...props}
            className={`${
               meta.error && meta.touched ? 'invalidInput' : ''
            } rounded-xl w-full rtl px-4 py-2`}
         />
         {meta.error && meta.touched ? (
            <p className="text-sm text-red-500">{meta.error}</p>
         ) : (
            ''
         )}
      </div>
   );
};

export default FormikInput;
