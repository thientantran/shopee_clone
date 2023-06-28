import { InputHTMLAttributes, useState } from 'react'
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form'
// type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputNumberProps) {
  const {
    type,
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    onChange,
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFormInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFormInput) || valueFormInput === '')
    if (numberCondition || type !== 'number') {
      // cap nhat local value state
      setLocalValue(valueFormInput)
      // gọi field.onChange để cập nhật vào state react hook form
      field.onChange(event)
      // thực thi onchange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
    }
  }
  return (
    <div className={className}>
      <input
        className={classNameInput}
        {...rest}
        {...field}
        //phải đẻ field và rest phía trước cái onChange được truyền vào, do trong field có 1 hàm onChange builtin, do đó có thể overwrite cái hàm onChange được truyền vào
        onChange={handleChange}
        value={value || localValue}
      />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}

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
