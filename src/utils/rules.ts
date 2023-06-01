import { type RegisterOptions } from 'react-hook-form'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// cac thong so trong rule, duoc quy dinh trong react hook form, minh co the lay trong do/
export const rules: Rules = {
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
    }
  }
}
