import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import Chat from './Components/Chat'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/chat' element={<Chat/>}></Route>
      </Routes>
       
    </>
  )
}

export default App
