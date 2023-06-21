export default function SortProductList() {
  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sap xep theo</div>
          <button className='h-8 bg-orange px-4 text-center text-sm capitalize text-white hover:bg-orange/80'>
            Pho bien
          </button>
          <button className='h-8 bg-white px-4 text-center text-sm capitalize text-black hover:bg-slate-100'>
            Moi nhat
          </button>
          <button className='h-8 bg-white px-4 text-center text-sm capitalize text-black hover:bg-slate-100'>
            Ban chay
          </button>
          <select className='h-8 bg-white px-4 text-left text-sm capitalize text-black outline-none hover:bg-slate-100'>
            <option value='' disabled>
              Gia
            </option>
            <option value='price:asc'>Gia: Thap den cao</option>
            <option value='price:desc'>Gia: Cao den thap</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2'>
            <button className='h-8 cursor-not-allowed rounded-bl-sm rounded-tl-sm bg-white/60 px-3 hover:bg-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5'
                />
              </svg>
            </button>
            <button className='h-8 rounded-bl-sm rounded-tl-sm bg-white px-3 hover:bg-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}