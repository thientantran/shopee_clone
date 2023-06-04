import { useRoutes } from 'react-router-dom'
import MainLayout from './lauputs/MainLayout/MainLayout'
import RegisterLayout from './lauputs/RegisterLayout/RegisterLayout'
import Login from './pages/Login/Login'
import ProductList from './pages/ProductList/ProductList'
import Register from './pages/Register/Register'

export default function useRouteElements() {
  const useRouteElements = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
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
  ])
  return useRouteElements
}
