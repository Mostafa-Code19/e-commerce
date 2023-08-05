export const persian = /^[آ-ی ء چ . ، ! ؟ 1-9 ۱-۹ re \r\n  ? ! _ - ' " ; : , ؛ : ( ) ژ 0 ۰]+$/

export const password = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[a-zA-Z]).{5,}$/

export const mobileNumber = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/

export const phoneNumber = /^0[0-9]{2,}[0-9]{7,}$/

export const melliCode = /^(?!(\d)\1{9})\d{10}$/
