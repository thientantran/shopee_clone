import classNames from 'classnames'
import { omit } from 'lodash'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { order as orderConstant, sortBy } from 'src/constants/product'
import { ProductListConfig } from 'src/types/product.type'
import { QueryConfig } from '../ProductList'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sap xep theo</div>
          <button
            className={classNames('h-8 bg-orange px-4 text-center text-sm capitalize', {
              'bg:orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
              'bg-white text-black': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Pho bien
          </button>
          <button
            className={classNames('h-8 bg-orange px-4 text-center text-sm capitalize', {
              'bg:orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
              'bg-white text-black': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Moi nhat
          </button>
          <button
            className={classNames('h-8 bg-orange px-4 text-center text-sm capitalize', {
              'bg:orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
              'bg-white text-black': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Ban chay
          </button>
          <select
            className={classNames('h-8 px-4 text-left text-sm capitalize outline-none', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
            })}
            value={order || ''}
            onChange={(event) => {
              handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)
            }}
          >
            <option value='' disabled className='bg-white text-black'>
              Gia
            </option>
            <option className='bg-white text-black' value={orderConstant.asc}>
              Gia: Thap den cao
            </option>
            <option className='bg-white text-black' value={orderConstant.desc}>
              Gia: Cao den thap
            </option>
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
