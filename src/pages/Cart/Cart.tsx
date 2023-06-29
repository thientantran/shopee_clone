import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button/Button'
import QuantityController from 'src/components/QuantityController/QuantityController'
import { purchasesStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
      // khi mà update số lượng, thì khi đó sẽ gọi api để update, sau khi api gọi update thành công thì sẽ refetch để gọi data về lại
      // khi đó thì sẽ nhảy vào useEffect ở dưới để đổi lại checked và disable = false
    }
  })
  const buyPurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const purchasesInCart = purchasesInCartData?.data.data
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)
  const checkedPurchases = extendedPurchases.filter((purchase) => purchase.checked)
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasePrice = checkedPurchases.reduce((result, current) => {
    return result + current.product.price * current.buy_count
  }, 0)
  const totalCheckedPurchaseSavingPrice = checkedPurchases.reduce((result, current) => {
    return result + (current.product.price_before_discount - current.product.price) * current.buy_count
  }, 0)
  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: Boolean(extendedPurchasesObject[purchase._id]?.checked)
          // khi mà gọi api update, sẽ nhảy vào này để reset lại cái disable, nhưng mún giữ lại cái checked
        })) || []
      )
    })
  }, [purchasesInCart])

  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }
  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }
  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }
  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }
  const handleDeleteManyPurchases = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseIds)
  }
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          {/* OVERFLOW-AUTO GIUP CO SCROLL KHI MAN HINH NHO  */}
          <div className='min-w-[1000px]'>
            {/* render columns name */}
            <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <div className='flex-grow text-black'>San pham</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Don gia</div>
                  <div className='col-span-1'>So luong</div>
                  <div className='col-span-1'>So tien</div>
                  <div className='col-span-1'>Thao tac</div>
                </div>
              </div>
            </div>
            {/* render sp */}
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {extendedPurchases?.map((purchase, index) => (
                <div
                  key={purchase._id}
                  className='mt-5 grid grid-cols-12 rounded-sm border border-gray-200 bg-white px-4 py-5 text-sm text-gray-500 first:mt-0'
                >
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={purchase.checked}
                          onChange={handleCheck(index)}
                        />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link
                            className='h-20 w-20 flex-shrink-0'
                            to={`/${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                          >
                            <img src={purchase.product.image} alt={purchase.product.name} />
                          </Link>
                          <div className='flex-grow px-2 pb-2 pt-1'>
                            <Link
                              to={`/${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                              className='line-clamp-2'
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-300 line-through'>
                            d {formatCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className='ml-2 text-orange'>d {formatCurrency(purchase.product.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                          classNameWrapper='flex items-center'
                          onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                          onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                          onType={handleTypeQuantity(index)}
                          onFocusOut={
                            (value) =>
                              handleQuantity(
                                index,
                                value,
                                value >= 1 &&
                                  value <= purchase.product.quantity &&
                                  value !== (purchasesInCart as Purchase[])[index].buy_count
                                // để khi chỉ khi đổi giá trị mới gọi api, còn k thì sẽ ko gọi
                              )
                            // tái sử dụng cái này lại, khi focuse out ra thì nó sẽ gọi api
                          }
                          disabled={purchase.disabled}
                        />
                      </div>
                      <div className='col-span-1 text-center'>
                        <span className='text-orange'>
                          d {formatCurrency(purchase.product.price * purchase.buy_count)}
                        </span>
                      </div>
                      <div className='col-span-1 text-center'>
                        <button
                          onClick={handleDelete(index)}
                          className='bg-none text-black transition-colors hover:text-orange'
                        >
                          Xoa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* phai de the chua sticky o ngoai the overflow-AUTO */}
        <div className='sticky bottom-0 z-10 mt-10 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className='h-5 w-5 accent-orange'
                checked={isAllChecked}
                onChange={handleCheckAll}
              />
            </div>
            <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
              Chon tat ca ({extendedPurchases.length})
            </button>
            <button onClick={handleDeleteManyPurchases} className='mx-3 border-none bg-none'>
              Xoa
            </button>
          </div>

          <div className='ml-auto mt-5 flex flex-col sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center justify-end'>
                <div>Tong thanh toan ({checkedPurchasesCount} san pham): </div>
                <div className='ml-2 text-2xl text-orange'>d{formatCurrency(totalCheckedPurchasePrice)}</div>
              </div>
              <div className='flex items-center justify-end text-sm'>
                <div className='text-gray-500'>Tiet kiem</div>
                <div className='ml-6 text-orange'>d{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
              </div>
            </div>
            <div className='mt-2 flex justify-end sm:mt-0'>
              <Button className='ml-4 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600'>
                mua hang
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
