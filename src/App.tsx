import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useRouteElements from './useRouteElements'

function App() {
  const rootElements = useRouteElements()

  return (
    <div>
      {' '}
      {rootElements}
      <ToastContainer />
    </div>
  )
}

export default App
