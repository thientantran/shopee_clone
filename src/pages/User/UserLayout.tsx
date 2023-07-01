import { Outlet } from 'react-router-dom'
import UserSideNav from './component/UserSideNav'

export default function UserLayout() {
  return (
    <div>
      <UserSideNav />
      <Outlet />
    </div>
  )
}
