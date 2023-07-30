import * as yup from "yup";

const persianRule = /^[آ-ی ء چ]+$/;
const mobileNumberRule = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;
const phoneNumberRule = /^0[0-9]{2,}[0-9]{7,}$/;
const melliCodeRule = /^(?!(\d)\1{9})\d{10}$/;

const ProfileSchemaValidation = yup.object().shape({
   name: yup
      .string()
      .matches(
         persianRule,
         "لطفا نام و نام خانوادگی خود را به فارسی وارد کنید"
      ),

   mobile_number: yup
      .string()
      .matches(mobileNumberRule, { message: "شماره تماس نامعتبر می‌باشد" }),

   phone_number: yup
      .string()
      .min(11, "لطفا کد استان بهمراه شماره تلفن ثابت درج شود")
      .matches(phoneNumberRule, { message: "شماره تلفن ثابت نامعتبر می‌باشد" }),

   melli_code: yup
      .string()
      .matches(melliCodeRule, { message: "کدملی وارد شده نامعتبر می‌باشد" }),

   address: yup
      .string()
      .min(10, "لطفا آدرس را دقیق تر بنویسید")
      .matches(persianRule, { message: "لطفا آدرس خود را به فارسی وارد کنید" }),
});

export default ProfileSchemaValidation;
