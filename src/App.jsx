import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Tasks from './pages/tasks'
import Login from './pages/login'
import Register from './pages/register'
import NavBar from './components/navbar'
import Profile from './pages/profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/tasks' element={<Tasks/>}> </Route>
        <Route path='/login' element={<Login/>}> </Route>
        <Route path='/register' element={<Register/>}> </Route>
        <Route path='/profile' element={<Profile/>}> </Route>
      </Routes>
    </div>
  )
}

export default App
