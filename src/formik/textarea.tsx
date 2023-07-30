import { useField } from "formik";

const FormikTextarea = ({ label, ...props }: any) => {
   const [field, meta] = useField(props);

   return (
      <div className="mb-6 text-right">
         <label>{label}</label>
         <textarea
            {...field}
            {...props}
            rows={3}
            className="w-full pl-6 py-1"
         />
         {meta.error && meta.touched ? (
            <p className="text-sm text-red-500">{meta.error}</p>
         ) : (
            ""
         )}
      </div>
   );
};

export default FormikTextarea;
