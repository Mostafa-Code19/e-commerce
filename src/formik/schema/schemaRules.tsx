export const persianRule = /^[آ-ی ء چ . ، ! ؟ 1-9 ۱-۹   ? ! _ - ' " ; : , ؛ : ( ) ژ]+$/;

export const colorRules = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const passwordRules = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[a-zA-Z]).{5,}$/;

export const mobileNumberRule = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;

export const phoneNumberRule = /^0[0-9]{2,}[0-9]{7,}$/;

export const melliCodeRule = /^(?!(\d)\1{9})\d{10}$/;
