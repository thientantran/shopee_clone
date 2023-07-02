import { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'
export default function InputFile() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  // Tạo cái này để liên kết với nút button, khi nào nut button click thì nó ref tới chỗ choose file
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal.size >= 1048576 || fileFromLocal.type.includes('images'))) {
      toast.error('File không đúng quy định')
    } else {
      setFile(fileFromLocal)
    }
  }
  return (
    <Fragment>
      <input
        type='file'
        className='hidden'
        accept='.jpg, .jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        // onchange này chỉ kích hoạt khi 2 lần chọn 2 tấm ảnh khác nhau, để fix thì dùng onclick và set lại
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
      />
      <button
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        onClick={handleUpload}
      >
        Chon anh
      </button>
    </Fragment>
  )
}
