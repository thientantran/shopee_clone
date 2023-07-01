import { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppContext } from './contexts/api.context'
import useRouteElements from './useRouteElements'
import { LocalStorageEventTartget } from './utils/auth'

function App() {
  const rootElements = useRouteElements()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTartget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTartget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <div>
      {' '}
      {rootElements}
      <ToastContainer />
    </div>
  )
}

export default App
