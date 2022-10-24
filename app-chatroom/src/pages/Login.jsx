import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { liginRoute } from '../utils/APIRoutes'
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
  const navigate = useNavigate()

  const [values, setValues] = useState({
    username: "",
    password: "",
  })

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/')
    }
  }, [navigate])

  const handleChage = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleValidation = () => {
    const {password, username } = values
    if (password === "" ) {
      toast.error('Email and Password is required.', toastOptions)
      return false
    } else if (username.length === "") {
      toast.error('Email and Password is required.', toastOptions)
      return false
    } 
    return true
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (handleValidation()) {
      const {password, username } = values
      const { data } = await axios.post(liginRoute, {
        username, password
      })

      if (data.status) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        navigate("/")
      } else {
        toast.error(data.msg, toastOptions)
      }
    }
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="" />
            <h1>snappy</h1>
          </div>
          <input type="text" placeholder="Username" name='username' onChange={e => handleChage(e)}/>
          <input type="password" placeholder="Password" name='password' onChange={e => handleChage(e)}/>
          <button type="submit">Login</button>
          <span>Don't have an account? <Link to="/register">Register</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-teansform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: .1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
