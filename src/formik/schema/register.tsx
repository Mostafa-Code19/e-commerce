import * as yup from 'yup'
import { passwordRules } from './schemaRules'

const RegisterSchemaValidation = yup.object().shape({
   email: yup.string().email('ایمیل می‌بایست معتبر باشد').required('لطفا یک ایمیل وارد کنید'),
   password: yup
      .string()
      .min(5, 'رمز شما می‌بایست حداقل ۵ کاراکتر باشد')
      .matches(passwordRules, {
         message: 'رمز شما می‌بایست حداقل یک عدد و یک حرف کوچک یا بزرگ داشته باشد',
      })
      .required('لطفا یک رمز وارد کنید'),
   confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'رمز عبور شما یکسان نمی‌باشد')
      .required('لطفا رمز عبور خود را تایید کنید'),
})

export default RegisterSchemaValidation
