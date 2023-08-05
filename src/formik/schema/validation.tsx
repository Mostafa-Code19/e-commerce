import * as yup from 'yup'
import * as rule from './rules'

export const RegisterSchemaValidation = yup.object().shape({
   email: yup.string().email('ایمیل می‌بایست معتبر باشد').required('لطفا یک ایمیل وارد کنید'),
   password: yup
      .string()
      .min(5, 'رمز شما می‌بایست حداقل ۵ کاراکتر باشد')
      .matches(rule.password, {
         message: 'رمز شما می‌بایست حداقل یک عدد و یک حرف کوچک یا بزرگ داشته باشد',
      })
      .required('لطفا یک رمز وارد کنید'),
   confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'رمز عبور شما یکسان نمی‌باشد')
      .required('لطفا رمز عبور خود را تایید کنید'),
})

export const LoginSchemaValidation = yup.object().shape({
   email: yup.string().email('ایمیل می‌بایست معتبر باشد').required('لطفا یک ایمیل وارد کنید'),
   password: yup
      .string()
      .min(5, 'رمز شما می‌بایست حداقل ۵ کاراکتر باشد')
      .matches(rule.password, {
         message: 'رمز شما می‌بایست حداقل یک عدد و یک حرف کوچک یا بزرگ داشته باشد',
      })
      .required('لطفا یک رمز وارد کنید'),
})

export const ProfileSchemaValidation = yup.object().shape({
   name: yup.string().matches(rule.persian, 'لطفا نام و نام خانوادگی خود را به فارسی وارد کنید'),

   mobileNumber: yup.string().matches(rule.mobileNumber, { message: 'شماره تماس نامعتبر می‌باشد' }),

   phoneNumber: yup
      .string()
      .min(11, 'لطفا کد استان بهمراه شماره تلفن ثابت درج شود')
      .matches(rule.phoneNumber, { message: 'شماره تلفن ثابت نامعتبر می‌باشد' }),

   melliCode: yup.string().matches(rule.melliCode, { message: 'کدملی وارد شده نامعتبر می‌باشد' }),

   address: yup
      .string()
      .min(10, 'لطفا آدرس را دقیق تر بنویسید')
      .matches(rule.persian, { message: 'لطفا آدرس خود را به فارسی وارد کنید' }),
})

export const ProductSchemaValidation = yup.object().shape({
   title: yup
      .string()
      .min(3, 'عنوان حداقل باید ۳ کارکتر باشد')
      .required('عنوان محصول را وارد کنید')
      .matches(rule.persian, { message: 'لطفا عنوان را به فارسی وارد کنید' }),

   description: yup
      .string()
      .min(30, 'توضیحات حداقل باید ۳۰ کارکتر باشد')
      .required('توضیحات محصول را وارد کنید')
      .matches(rule.persian, { message: 'لطفا توضیحات را به فارسی وارد کنید' }),

   brand: yup.string().required('برند محصول را وارد کنید'),
})

export const TitleAndDescriptionSchemaValidation = yup.object().shape({
   title: yup
      .string()
      .min(3, 'عنوان حداقل باید ۳ کارکتر باشد')
      .required('عنوان محصول را وارد کنید')
      .matches(rule.persian, { message: 'لطفا عنوان را به فارسی وارد کنید' }),

   description: yup
      .string()
      .min(30, 'توضیحات حداقل باید ۳۰ کارکتر باشد')
      .required('عنوان محصول را وارد کنید')
      .matches(rule.persian, { message: 'لطفا توضیحات را به فارسی وارد کنید' }),
})

export const LocationSchemaValidation = yup.object().shape({
   price: yup.number().min(1000, 'حداقل قیمت ۱۰۰۰ تومان است').required('قیمت چهره را وارد کنید'),

   discount: yup
      .number()
      .lessThan(100, 'تخفیف باید کمتر از ۱۰۰ باشد')
      .moreThan(-1, 'تخفیف می‌بایست مساوی یا بیشتر از ۰ باشد')
      .required('(در صورت نداشت عدد ۰ را وارد کنید) تخفیف چهره را وارد کنید'),

   size: yup
      .number()
      .max(50, 'حداکثر سایز ۵۰ است')
      .min(30, 'حداقل سایز ۳۰ است')
      .required('سایز چهره را وارد کنید'),

   quantity: yup
      .number()
      .moreThan(-1, 'سایز می‌بایست مساوی یا بیشتر از ۰ باشد')
      .required('تعداد موجودی چهره را وارد کنید'),

   color: yup
      .string()
      .required('رنگ چهره را وارد کنید')
      .oneOf(
         [
            'WHITE',
            'BLACK',
            'YELLOW',
            'ORANGE',
            'RED',
            'BROWN',
            'PURPLE',
            'DARKBLUE',
            'BLUE',
            'LIGHTBLUE',
            'GREEN',
            'YELLOWGREEN',
         ],
         {
            message: 'رنگ وارد شده معتبر نمی‌باشد',
         },
      ),
})
