import * as yup from 'yup'
import { persianRule } from './schemaRules'

const ProductSchemaValidation = yup.object().shape({
   title: yup
      .string()
      .min(3, 'عنوان حداقل باید ۳ کارکتر باشد')
      .required('عنوان محصول را وارد کنید')
      .matches(persianRule, { message: 'لطفا عنوان را به فارسی وارد کنید' }),

   description: yup
      .string()
      .min(30, 'توضیحات حداقل باید ۳۰ کارکتر باشد')
      .required('توضیحات محصول را وارد کنید')
      .matches(persianRule, { message: 'لطفا توضیحات را به فارسی وارد کنید' }),

   brand: yup.string().required('برند محصول را وارد کنید'),
})

export default ProductSchemaValidation
