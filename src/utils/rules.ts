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
  confirm_password: yup
    .string()
    .required('Nhap lai password la bat buoc')
    .min(6, 'Do dai tu 6-160 ky tu')
    .max(160, 'Do dai tu 6-160 ky tu')
    .oneOf([yup.ref('password')], 'Nhap lai password khong khop')
})

export const loginSchema = schema.omit(['confirm_password'])

export type Schema = yup.InferType<typeof schema>
