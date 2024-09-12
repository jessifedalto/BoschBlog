import { Route, Routes } from 'react-router-dom'
import './styles/global.css'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './pages/ProtectedRoute'
import NavBar from './components/NavBar'
import RegisterPage from './pages/RegisterPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/main' element={
          <ProtectedRoute
            errorPage={<h1>Você não está logado</h1>}
            targetPage={<NavBar />}
          />
        }>
          <Route path='' element={<LoginPage />} />
        </Route>
        <Route path='*' element={<h1 children={"olá"}/>} />
      </Routes>
    </>
  )
}

export default App
