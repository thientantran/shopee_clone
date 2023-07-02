import Button from 'src/components/Button/Button'
import Input from 'src/components/Input/Input'

export default function ChangePassword() {
  return (
    <div className='pd-10 rounded-sm bg-white px-2 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>Quan ly thong tin ho so de bao mat tai khoan</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Mật khẩu cũ</div>
            <div className='w-[80%] pl-5'>
              <Input
                // register={register}
                name='password'
                type='password'
                placeholder='Nhập mật khẩu cũ'
                // errorMessage={errors.address?.message}
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Mật khẩu mới</div>
            <div className='w-[80%] pl-5'>
              <Input
                // register={register}
                name='new_password'
                type='password'
                placeholder='Nhập mật khẩu mới'
                // errorMessage={errors.address?.message}
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Xác nhận mật khẩu mới</div>
            <div className='w-[80%] pl-5'>
              <Input
                // register={register}
                name='confirm_password'
                type='password'
                placeholder='Xác nhận mật khẩu'
                // errorMessage={errors.address?.message}
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                type='submit'
                className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
              >
                Luu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
