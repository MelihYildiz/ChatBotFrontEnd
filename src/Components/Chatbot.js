import React, { useState } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';

const Container = styled.div`
  display: flex;
  justify-content: flex-start; /* Login ve Chatbot bileşenlerini yan yana hizalamak için */
  padding: 20px; /* İsteğe bağlı kenar boşlukları */
  height: 100vh; /* Tüm ekranı kaplaması için */
`;

const LoginContainer = styled.div`
  flex: 1; /* Kutuyu sola kadar genişletmek için */
  padding: 20px;
  height: 860px;
  border: 3px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 20px; /* ChatbotContainer'dan ayırmak için kenar boşluğu */
`;

const Logo = styled.img`
  width: 180px; /* Logonun genişliği, isteğe göre ayarlayabilirsiniz */
  margin-bottom: 20px; /* Logonun altına boşluk eklemek için */
`;

const ChatbotContainer = styled.div`
  width: 1600px;
  height: 900px;
  border: 3px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.h1`
  text-align: left;
  margin: 0;
  padding: 20px;
  background-color: #00FFFF; 
  color: red; 
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const ChatLog = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: scroll;
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: ${props => (props.isUser ? '#DCF8C6' : '#FFF')};
  align-self: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  border-radius: 5px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  width: 100%;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #00CCCC;
  }
`;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, isUser: true }]);
    // Mock response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: '--Botu bağladığımızda cevap verecek.--', isUser: false },
      ]);
    }, 1000);
  };

  return (
    <Container>
      <LoginContainer>
        <Logo src="digiturklogo.png" alt="Logo" />
        <h1>Login</h1>
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <Button>Login</Button>
      </LoginContainer>
      <ChatbotContainer>
        <Header>ChatBot</Header>
        <ChatLog>
          {messages.map((message, index) => (
            <Message key={index} isUser={message.isUser}>
              {message.text}
            </Message>
          ))}
        </ChatLog>
        <ChatInput onSendMessage={handleSendMessage} />
      </ChatbotContainer>
    </Container>
  );
};

export default Chatbot;
