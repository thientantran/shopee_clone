import { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'
// type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  // register: UseFormGetValues<FormData>
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  errorMessage,
  className,
  name,
  register,
  rules,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
  ...rest
}: Props) {
  const registerInput = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input className={classNameInput} {...registerInput} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
