import React, {useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import SetAvatar from './pages/SetAvatar'
import { ThemeProvider } from "styled-components";
import { BsSun, BsMoon } from 'react-icons/bs'

const defaultMode = {
  textColor:'white',
  backgroundColor:'#8BBDC5',
  sidebarColor: '#66cdaa',
}
const darkMode = {
  textColor:'gray',
  backgroundColor:'#131324',
  sidebarColor: '#131324',
}

export default function App() {
  const [color,setColor]=useState(defaultMode)
  return (
    <ThemeProvider theme={color}>
      <div style={{position: "absolute", top: '1.5rem', left: '2rem', cursor: 'pointer'}}>
        {
          color === darkMode 
            ? <BsSun onClick={() => setColor(defaultMode)} style={{width: '2rem', height: '2rem', color: 'white'}}/> 
            : <BsMoon onClick={() => setColor(darkMode)} style={{width: '2rem', height: '2rem'}}/>
        }
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/" element={<Chat/>}></Route>
          <Route path="/setAvatar" element={<SetAvatar />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
