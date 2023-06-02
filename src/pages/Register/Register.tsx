import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input/Input'
import { getRules } from 'src/utils/rules'

export interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()

  const rules = getRules(getValues)

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  return (
    <div className='bg-orange'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' noValidate onSubmit={onSubmit}>
              <div className='text-2xl'>Dang ky</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
                rules={rules.email}
                autoComplete='on'
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-8'
                errorMessage={errors.password?.message}
                placeholder='Password'
                rules={rules.password}
                autoComplete='on'
              />
              <Input
                name='confirm_password'
                register={register}
                type='password'
                className='mt-8'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm password'
                rules={rules.confirm_password}
                autoComplete='on'
              />
              <div className='mt-2'>
                <button
                  type='submit'
                  className='w-full bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  Dang ky
                </button>
              </div>
              <div className='mt-8 flex justify-center'>
                <span className='text-gray-400'>Ban da co tai khoan? </span>
                <Link className='ml-1 text-red-400' to='/login'>
                  Dang nhap
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
