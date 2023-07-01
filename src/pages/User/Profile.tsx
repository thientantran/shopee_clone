import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import userApi from 'src/apis/user.apis'
import Button from 'src/components/Button/Button'
import Input from 'src/components/Input/Input'
import InputNumber from 'src/components/InputNumber/InputNumber'
import { UserSchema, userSchema } from 'src/utils/rules'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])
export default function Profile() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data
  return (
    <div className='pd-10 rounded-sm bg-white px-2 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Ho so cua toi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quan ly thong tin ho so de bao mat tai khoan</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Email</div>
            <div className='w-[80%] pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Ten</div>
            <div className='w-[80%] pl-5'>
              <Input
                register={register}
                name='name'
                placeholder='Ten'
                errorMessage={errors.name?.message}
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>So dien thoai</div>
            <div className='w-[80%] pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                    placeholder='So dien thoai'
                    errorMessage={errors.phone?.message}
                    {...field}
                    onChange={field.onChange}
                    // phai de onChange phia sau, do field co generate ra onChange, nen de onChange phia sau de overwrite
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Dia chi</div>
            <div className='w-[80%] pl-5'>
              <Input
                register={register}
                name='address'
                placeholder='Dia Chi'
                errorMessage={errors.address?.message}
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Ngay sinh</div>
            <div className='w-[80%] pl-5'>
              <div className='flex justify-between'>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Ngay</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Thang</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Nam</option>
                </select>
              </div>
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'>
                Luu
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src='https://down-vn.img.susercontent.com/file/br-11134226-7qukw-levcx0zgr2n3d2_tn'
                alt='avatar'
                className='f-full w-full rounded-full object-cover'
              />
            </div>
            <input type='file' className='hidden' accept='.jpg, .jpeg,.png' />
            <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'>
              Chon anh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dung luong file toi da 1MB</div>
              div.Dinh dang: .JPEG, .PNG
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
