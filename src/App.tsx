import { useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'
import { QueryClientProvider, QueryClient } from 'react-query'



function App() {
  const [count, setCount] = useState(0)
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">

    </div>
    </QueryClientProvider>
  )
}

export default App
