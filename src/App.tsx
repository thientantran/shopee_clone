import useRouteElements from './useRouteElements'

function App() {
  const rootElements = useRouteElements()

  return <div> {rootElements}</div>
}

export default App
