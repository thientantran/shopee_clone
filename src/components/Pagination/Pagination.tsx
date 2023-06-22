interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}

export default function Pagination({ page, setPage, pageSize }: Props) {
  const renderPagination = () => {
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        return (
          <button key={index} className='mx-2 mt-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm'>
            {pageNumber}
          </button>
        )
      })
  }
  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      <button className='mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm'>Prev</button>
      {renderPagination()}
      <button className='mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm'>Next</button>
    </div>
  )
}
