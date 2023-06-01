import { useRoutes } from 'react-router-dom'
import RegisterLayout from './lauputs/RegisterLayout/RegisterLayout'
import Login from './pages/Login/Login'
import ProductList from './pages/ProductList/ProductList'
import Register from './pages/Register/Register'

export default function useRouteElements() {
  const useRouteElements = useRoutes([
    {
      path: '/',
      element: <ProductList />
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
