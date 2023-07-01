import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './contexts/api.context'
import CartLayout from './lauputs/CartLayout/CartLayout'
import MainLayout from './lauputs/MainLayout/MainLayout'
import RegisterLayout from './lauputs/RegisterLayout/RegisterLayout'
import Cart from './pages/Cart/Cart'
import Login from './pages/Login/Login'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import ProductList from './pages/ProductList/ProductList'
import Register from './pages/Register/Register'
import ChangePassword from './pages/User/ChangePassword'
import HistoryPurchase from './pages/User/HistoryPurchase'
import Profile from './pages/User/Profile'
import UserLayout from './pages/User/UserLayout'

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
          path: '/cart',
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: '/user',
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: '/user/profile',
              element: <Profile />
            },
            {
              path: '/user/password',
              element: <ChangePassword />
            },
            {
              path: '/user/history',
              element: <HistoryPurchase />
            }
          ]
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
      path: ':nameId',
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    }
  ])
  return useRouteElements
}
