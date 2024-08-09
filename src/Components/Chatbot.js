import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import { convertToAscii } from '../Services/asciiService';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100vh;
`;

const ChatbotContainer = styled.div`
  width: 1200px;
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

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message) => {
    // Kullanıcı mesajını ekle (orijinal haliyle)
    setMessages([...messages, { text: message, isUser: true }]);

    // Kullanıcı mesajını ASCII formatına çevirip bot cevabı olarak ekle
    setTimeout(() => {
      const asciiMessage = convertToAscii(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: asciiMessage, isUser: false },
      ]);
    }, 1000);
  };

  return (
    <Container>
      <ChatbotContainer>
        <Header>ChatBot</Header>
        <ChatLog>
          {messages.map((message, index) => (
            <Message key={index} isUser={message.isUser}>
              {message.text}
            </Message>
          ))}
          <div ref={chatEndRef} /> {/* Bu div, en son mesajın altında kalır */}
        </ChatLog>
        <ChatInput onSendMessage={handleSendMessage} />
      </ChatbotContainer>
    </Container>
  );
};

export default Chatbot;
