import React, { useState, useEffect, useRef } from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from "../utils/APIRoutes";
import axios from 'axios';
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import { io } from "socket.io-client"

export default function Chat() {
  const socket = useRef()
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined);

  const [socketList, setSocketList] = useState([])

  useEffect(() => {
    // check()
    const checkIsLogin = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem("chat-app-user")
          )
        );
      }
    }
    checkIsLogin()
  }, [navigate])

  useEffect(() => {
    const checkCurrentUser = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data.data)
        } else {
          navigate('/setAvatar')
        }
      }
    }
    checkCurrentUser()
  }, [currentUser, navigate])

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host)
      socket.current.emit("add-user", currentUser._id)

      // 獲取目前使用者清單
      socket.current.on("getUserList", (data) => {
        console.log('list', data)
        setSocketList(data)
      })

      // 獲取其他加入使用者進入
      socket.current.on("getUserJoin", (data) => {
        console.log('join', data)
        setSocketList(socketList => [...socketList, data]);
      })
      
      // 獲取其他使用者離開
      socket.current.on("getUserLeave", (data) => {
        console.log('leave', data)
        setSocketList(socketList => socketList.filter((item) => item !== data))
      })
    }
  }, [currentUser])
  
  useEffect(() => {
    if (socketList) {
      setContacts(contacts => {
        return contacts.map((item) => {
          if (socketList.includes(item._id)) {
            item.isOnline = true
          } else {
            item.isOnline = false
          }
          return item
        })
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketList])


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className='container'>
        <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
          )}
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: ${props => props.theme.backgroundColor};
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
