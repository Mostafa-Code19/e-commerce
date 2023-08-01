import * as yup from 'yup';

const ProductSchemaValidation = yup.object().shape({
   title: yup
      .string()
      .min(3, 'عنوان حداقل باید ۳ کارکتر باشد')
      .required('عنوان محصول را وارد کنید'),

   description: yup
      .string()
      .min(30, 'توضیحات حداقل باید ۳۰ کارکتر باشد')
      .required('عنوان محصول را وارد کنید'),

   brand: yup
      .string()
      .required('برند محصول را وارد کنید')
});

export default ProductSchemaValidation;
