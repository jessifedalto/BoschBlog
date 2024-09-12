import { Route, Routes } from 'react-router-dom'
import './styles/global.css'
import LoginPage from './pages/LoginPage'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/teste' element={<h1>Main page</h1>} />
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
