import * as yup from 'yup';

const colorRules = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const RegisterSchemaValidation = yup.object().shape({
   price: yup
      .number()
      .min(1000, 'حداقل قیمت ۱۰۰۰ تومان است')
      .required('قیمت چهره را وارد کنید'),

   discount: yup
      .number()
      .lessThan(100, 'تخفیف باید کمتر از ۱۰۰ باشد')
      .moreThan(-1,  'تخفیف می‌بایست مساوی یا بیشتر از ۰ باشد')
      .required('(در صورت نداشت عدد ۰ را وارد کنید) تخفیف چهره را وارد کنید'),

   size: yup
      .number()
      .max(50, 'حداکثر سایز ۵۰ است')
      .min(30, 'حداقل سایز ۳۰ است')
      .required('سایز چهره را وارد کنید'),

   quantity: yup
      .number()
      .moreThan(-1,  'سایز می‌بایست مساوی یا بیشتر از ۰ باشد')
      .required('تعداد موجودی چهره را وارد کنید'),

   color: yup
      .string()
      .required('رنگ چهره را وارد کنید')
      .matches(colorRules, {
         message: 'رنگ وارد شده معتبر می‌باشد',
      }),
});

export default RegisterSchemaValidation;
