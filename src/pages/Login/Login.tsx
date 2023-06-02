import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input/Input'
import { Schema, schema } from 'src/utils/rules'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  // const rules = getRules(getValues)

  const onSubmit = handleSubmit(
    (data) => {
      console.log(data)
    },
    (errors) => console.log(errors)
  )
  return (
    <div className='bg-orange'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' noValidate onSubmit={onSubmit}>
              <div className='text-2xl'>Dang nhap</div>
              {/* <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'>Email khong hop le</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  name='password'
                  className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Password'
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'></div>
              </div> */}
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
                // rules={rules.email}
                autoComplete='on'
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-8'
                errorMessage={errors.password?.message}
                placeholder='Password'
                // rules={rules.password}
                autoComplete='on'
              />
              <div className='mt-3'>
                <button className='w-full bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'>
                  Dang nhap
                </button>
              </div>
              <div className='mt-8 flex justify-center'>
                <span className='text-gray-400'>Ban chua co tai khoan? </span>
                <Link className='ml-1 text-red-400' to='/register'>
                  Dang ky
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
