import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot02.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const setUser = async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem("chat-app-user")
      ).username
    )} 

    setUser()
  }, [])
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        歡迎, <span>{userName}!</span>
      </h1>
      <h3>請選擇對話窗開始聊天!</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
