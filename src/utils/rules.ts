import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// cac thong so trong rule, duoc quy dinh trong react hook form, minh co the lay trong do/
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  // muon biet type cua getValue thi vao trong ham` de xem
  email: {
    required: {
      value: true,
      message: 'Email is required'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email khong dung dinh dang'
    },
    maxLength: {
      value: 160,
      message: 'Do dai tu 5-160 ky tu'
    },
    minLength: {
      value: 5,
      message: 'Do dai tu 5-160 ky tu'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    maxLength: {
      value: 160,
      message: 'Do dai tu 6-160 ky tu'
    },
    minLength: {
      value: 6,
      message: 'Do dai tu 6-160 ky tu'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm Password is required'
    },
    maxLength: {
      value: 160,
      message: 'Do dai tu 6-160 ky tu'
    },
    minLength: {
      value: 6,
      message: 'Do dai tu 6-160 ky tu'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhap lai password, ko giong nhau'
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

const handleConfirmPassword = (refString: string) => {
  return yup
    .string()
    .required('Nhap lai password la bat buoc')
    .min(6, 'Do dai tu 6-160 ky tu')
    .max(160, 'Do dai tu 6-160 ky tu')
    .oneOf([yup.ref(refString)], 'Nhap lai password khong khop')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email la bat buoc')
    .email('Email khong dung dinh dang')
    .min(5, 'Do dai tu 5 - 160 ky tu')
    .max(160, 'Do dai tu 5-160 ky tu'),
  password: yup
    .string()
    .required('Password la bat buoc')
    .min(6, 'Do dai tu 6-160 ky tu')
    .max(160, 'Do dai tu 6-160 ky tu'),
  confirm_password: handleConfirmPassword('password'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Gia khong phu hop',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Gia khong phu hop',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc!')
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Do dai toi da la 160 ky tu'),
  phone: yup.string().max(20, ' Do dai toi da la 20 ky tu'),
  address: yup.string().max(160, 'Do dai toi da la 160 ky tu'),
  avatar: yup.string().max(1000, 'Do dai toi da 1000 ky tu'),
  date_of_birth: yup.date().max(new Date(), 'Hay chon ngay trong qua khu'),
  password: yup
    .string()
    .required('Password la bat buoc')
    .min(6, 'Do dai tu 6-160 ky tu')
    .max(160, 'Do dai tu 6-160 ky tu'),
  new_password: yup
    .string()
    .required('Password la bat buoc')
    .min(6, 'Do dai tu 6-160 ky tu')
    .max(160, 'Do dai tu 6-160 ky tu'),
  confirm_password: handleConfirmPassword('new_password')
})

export type UserSchema = yup.InferType<typeof userSchema>
export const loginSchema = schema.omit(['confirm_password'])

export type Schema = yup.InferType<typeof schema>
