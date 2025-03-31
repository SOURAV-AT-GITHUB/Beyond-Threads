
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './Pages/Home/Home'
import Login from './Pages/Login'

function App() {

  return (
    <>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>

  </Routes>
    </>
  )
}

export default App
