import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button/Button'
import Input from 'src/components/Input/Input'
import { AppContext } from 'src/contexts/api.context'
import { ErrorResponse } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

// export interface FormData {
//   email: string
//   password: string
//   confirm_password: string
// }

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  // const rules = getRules(getValues)

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit(
    (data) => {
      const body = omit(data, ['confirm_password'])
      registerAccountMutation.mutate(body, {
        onSuccess: (data) => {
          setIsAuthenticated(true)
          setProfile(data.data.data.user)
          navigate('/')
        },
        onError: (error) => {
          if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
            const formError = error.response?.data.data
            // if (formError?.email) {
            //   setError('email', {
            //     message: formError['email'],
            //     type: 'Server'
            //   })
            // }
            if (formError) {
              Object.keys(formError).forEach((key) => {
                setError(key as keyof Omit<FormData, 'confirm_password'>, {
                  message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                  type: 'Server'
                })
              })
            }
          }
        }
      })
    },
    (errors) => console.log(errors)
  )
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
              <Input
                name='confirm_password'
                register={register}
                type='password'
                className='mt-8'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm password'
                // rules={rules.confirm_password}
                autoComplete='on'
              />
              <div className='mt-2'>
                <Button
                  type='submit'
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                  className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  Dang ky
                </Button>
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
