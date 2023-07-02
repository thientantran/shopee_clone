export default function DateSelect() {
  return (
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
  )
}
