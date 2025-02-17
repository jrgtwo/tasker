import './App.css';

import { UserLoginProvider } from './context/UserLogin/UserLoginProvider'
import { Router } from './routes/Router';

function App() {
  return (
    <>
      <UserLoginProvider>
        <Router />
      </UserLoginProvider>
    </>
  )
}

export default App
