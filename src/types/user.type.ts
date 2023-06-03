export interface User {
  _id: string
  roles: Role[]
  email: string
  name: string
  date_of_birth: null
  address: string
  phone: string
  createAt: string
  updateAt: string
  _v: number
}

type Role = 'User' | 'Admin'
