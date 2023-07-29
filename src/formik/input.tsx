import { useField } from 'formik'

const FormikInput = ({ label, ...props }: any) => {
    const [field, meta] = useField(props)

    return (
        <div className="mb-6 text-right">
            <label>{label}</label>
            <input
                {...field}
                {...props}
                className={`${(meta.error && meta.touched) ? 'invalidInput':''} rounded-xl w-full pl-6 py-2`}
            />
            {(meta.error && meta.touched) ? <p className='text-sm text-red-500'>{meta.error}</p>:'' }
        </div>
    )
}

export default FormikInput