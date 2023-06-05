import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './contexts/api.context'
import MainLayout from './lauputs/MainLayout/MainLayout'
import RegisterLayout from './lauputs/RegisterLayout/RegisterLayout'
import Login from './pages/Login/Login'
import ProductList from './pages/ProductList/ProductList'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'

//login chua?
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const useRouteElements = useRoutes([
    // {
    //   path: '/',
    //   element: (
    //     <MainLayout>
    //       <ProductList />
    //     </MainLayout>
    //   )
    // },
    //Neu duong dan nao` trung voi path, thi se thuc hien cai element, roi neu outlet thi moi tim trong children xem co cai nao giong ko, neu giong thi tra ve element
    // vi du path 1: =pro,
    /// thoa dieu kien element 1:, nhay vao children tim thay path 2: profile,
    // ko pro != profile => ko tra ve duoc
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },

    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: '/register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          index: true,
          element: (
            <MainLayout>
              <ProductList />
            </MainLayout>
          )
        }
      ]
    }
  ])
  return useRouteElements
}
