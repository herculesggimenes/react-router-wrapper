import { RestQueryProvider } from '../restQuery'
import restQueryClient from './restQueryClient'
import { UseGetComponent } from './UseGetComponent'



function App() {
  return (
    <RestQueryProvider restQueryClient={restQueryClient}>
      <UseGetComponent/>
    </RestQueryProvider>
  )
}

export default App
