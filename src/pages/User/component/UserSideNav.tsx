import { Link } from 'react-router-dom'

export default function UserSideNav() {
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link
          to='/user/profile'
          className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'
        >
          <img
            src='https://down-vn.img.susercontent.com/file/br-11134226-7qukw-levcx0zgr2n3d2_tn'
            alt='avatar'
            className='h-full w-full rounded-full object-cover'
          ></img>
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>tantran</div>
          <Link to='/user/profile' className='flex items-center capitalize text-gray-500'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sua ho so
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <Link className='transiton-colors flex items-center capitalize text-gray-600' to='/user/profile'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img alt='avatar' src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' />
          </div>
          Tai khoan cua toi
        </Link>
        <Link className='transiton-colors mt-4 flex items-center capitalize text-gray-600' to='/user/password'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img alt='password' src='https://down-vn.img.susercontent.com/file/84feaa363ce325071c0a66d3c9a88748' />
          </div>
          Doi mat khau
        </Link>
        <Link className='transiton-colors mt-4 flex items-center capitalize text-gray-600' to='/user/history'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img alt='history' src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078' />
          </div>
          Lich su mua hang
        </Link>
      </div>
    </div>
  )
}