import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import { purchasesStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/api.context'
import { queryClient } from 'src/main'
import Popover from '../Popover/Popover'
export default function NavHeader() {
  const { isAuthenticated, setIsAuthenticated, setProfile, profile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
      // de khi dang xuat, se ko con hien thi so luong san pham trong cart nua
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='flex justify-end'>
      <Popover
        as='span'
        className='flex cursor-pointer items-center py-1 shadow-sm hover:text-gray-300'
        renderPopover={
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
            <div className='flex flex-col px-3 py-2'>
              <button className='px-3 py-2 hover:text-orange'>Tieng Viet</button>
              <button className='mt-2 px-3 py-2 hover:text-orange'>Tieng Anh</button>
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1'>Tieng Viet</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>
      {isAuthenticated && (
        <Popover
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <Link
                to='/user/profile'
                className='hover:bg-stale-100 block w-full bg-white px-4 py-3 text-left hover:text-cyan-500'
              >
                Tai khoan cua toi
              </Link>
              <Link to='/' className='hover:bg-stale-100 block w-full bg-white px-4 py-3 text-left hover:text-cyan-500'>
                Don mua
              </Link>
              <button
                onClick={handleLogout}
                className='hover:bg-stale-100 block w-full bg-white px-4 py-3 text-left hover:text-cyan-500'
              >
                Dang xuat
              </button>
            </div>
          }
          className='ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300'
        >
          <div className='mr-2 h-6 w-6 flex-shrink-0'>
            <img
              src='https://down-vn.img.susercontent.com/file/br-11134226-7qukw-levcx0zgr2n3d2_tn'
              alt='avatar'
              className='h-full w-full rounded-full object-cover'
            />
          </div>
          <div>{profile?.email}</div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to='/register' className='mx-3 capitalize hover:text-white/70'>
            Dang ky
          </Link>
          <div className='h-4 border-r-[1px] border-r-white/40'></div>
          <Link to='/login' className='mx-3 capitalize hover:text-white/70'>
            Dang nhap
          </Link>
        </div>
      )}
    </div>
  )
}
