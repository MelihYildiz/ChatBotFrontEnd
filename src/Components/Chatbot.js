import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import Sidebar from './Sidebar';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100vh;
  background-color: #f5f5f5;
`;

const ChatbotContainer = styled.div`
  width: 1200px; /* Daha geniş bir genişlik ayarlandı */
  height: 90%; /* Yükseklik, ekran yüksekliğinin %90'ı olarak ayarlandı */
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  margin: 0;
  padding: 20px;
  background-color: #007BFF;
  color: #ffffff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
`;

const ChatLog = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  border-bottom: 1px solid #ddd;
  background-color: #f9f9f9;
`;

const Message = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  background-color: ${props => (props.isUser ? '#DCF8C6' : '#ffffff')};
  align-self: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  border-radius: 20px;
  max-width: 60%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const fetchCryptoPrices = async (currency) => {
  try {
    const response = await axios.get(`http://localhost:61756/api/crypto/${currency}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return null;
  }
};

const Chatbot = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const chatLogRef = useRef(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem(`messages_${username}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [username]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`messages_${username}`, JSON.stringify(messages));
    }
  }, [messages, username]);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (message) => {
    const newMessages = [...messages, { text: message, isUser: true }];
    setMessages(newMessages);

    const result = await fetchCryptoPrices(message.toUpperCase());

    if (result && result.price) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Kripto Para: ${result.symbol}, Fiyat: ${result.price}`, isUser: false },
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Hata: ${message} için geçerli bir fiyat alınamadı.`, isUser: false },
      ]);
    }
  };

  return (
    <Container>
      <ChatbotContainer>
        <ChatContainer>
          <Header>ChatBot</Header>
          <ChatLog ref={chatLogRef}>
            {messages.map((message, index) => (
              <Message key={index} isUser={message.isUser}>
                {message.text}
              </Message>
            ))}
          </ChatLog>
          <ChatInput onSendMessage={handleSendMessage} />
        </ChatContainer>
        <Sidebar />
      </ChatbotContainer>
    </Container>
  );
};

export default Chatbot;
