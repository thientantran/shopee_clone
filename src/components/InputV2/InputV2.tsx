import { InputHTMLAttributes, forwardRef, useState } from 'react'
// type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

const InputV2 = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    errorMessage,
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    onChange,
    value = '',
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      // thực thi onchange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
      // cap nhat local value state
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} {...rest} ref={ref} value={value || localValue} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputV2

// function Hexa<T extends string>(props: { name: T; lastname: T }) {
//   return null
// }

// function App() {
//   // khi này lastname sẽ tự động gợi ý giá trị mà mình đã nhập ở name
//   return <Hexa name='tan' lastname='tan' />
// }

// type Gen<TFunc> = {
//   getName: TFunc
// }

// function Hexa1<TFunc extends () => string, TLastName extends ReturnType<TFunc>>(props: {
//   person: Gen<TFunc>
//   lastname: TLastName
// }) {
//   return null
// }

// const handleName: () => 'TAN' = () => 'TAN'

// function App1() {
//   return <Hexa1 person={{ getName: handleName }} lastname='TAN' />
// }
