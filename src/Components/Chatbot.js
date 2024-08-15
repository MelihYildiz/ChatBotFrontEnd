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
  width: 1200px;
  height: 900px;
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
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return { data: null, status: error.response ? error.response.status : 'N/A' };
  }
};

const addNewCurrency = async (symbol, name) => {
  try {
    const response = await axios.post('http://localhost:61756/api/crypto/add', {
      symbol: symbol.toUpperCase(),
      name: name
    });
    console.log('Sembol başarıyla eklendi:', response.data);
    return response.data;
  } catch (error) {
    console.error('Sembol eklenirken hata oluştu:', error);
    return null;
  }
};

const formatPrice = (price) => {
  return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

const statusMessages = {
  200: '200 OK - Başarıyla tamamlandı.',
  201: '201 Created - Başarıyla oluşturuldu.',
  204: '204 No Content - Başarıyla tamamlandı, ancak içerik yok.',
  400: '400 Bad Request - Kötü istek.',
  401: '401 Unauthorized - Yetkisiz.',
  403: '403 Forbidden - Yasaklı.',
  404: '404 Not Found - Bulunamadı.',
  500: '500 Internal Server Error - Sunucu hatası.',
  502: '502 Bad Gateway - Kötü ağ geçidi.',
  503: '503 Service Unavailable - Hizmet kullanılabilir değil.'
};

const getStatusMessage = (status) => {
  return statusMessages[status] || 'Bilinmeyen Durum';
};

const Chatbot = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currencies, setCurrencies] = useState([]);
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

    if (message.startsWith("Add ")) {
      const parts = message.split(",");
      if (parts.length === 2) {
        const symbol = parts[0].split(" ")[1].trim();
        const name = parts[1].trim();

        if (symbol.length <= 4 && /^[A-Z]+$/.test(symbol)) {
          const updatedCurrencies = await addNewCurrency(symbol, name);
          if (updatedCurrencies) {
            setCurrencies(updatedCurrencies);
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: `Yeni sembol eklendi: ${symbol} - ${name}`, isUser: false }
            ]);
          }
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'Girdi format hatalı. Lütfen "Add <symbol>, <name>" formatını kullanın.', isUser: false }
          ]);
        }
        setInputValue('');
        return;
      }
    }

    const { data, status } = await fetchCryptoPrices(message.toUpperCase());

    if (data && data.price) {
      const formattedPrice = formatPrice(parseInt(data.price.replace(/[^0-9]/g, ''), 10));
      setMessages((prevMessages) => [
        ...prevMessages,
        { 
          text: `Kripto Para: ${data.symbol}, Fiyat: ${formattedPrice}`, 
          isUser: false 
        }
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Hata: ${message} için geçerli bir fiyat alınamadı. HTTP Durum Kodu: ${status} (${getStatusMessage(status)})`, isUser: false }
      ]);
    }

    setInputValue(''); // Mesaj gönderildikten sonra textbox'ı sıfırlıyor.
  };

  const handleSelectCurrency = (currencyCode) => {
    setInputValue(currencyCode);
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
          <ChatInput 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSendMessage={() => handleSendMessage(inputValue)}
          />
        </ChatContainer>
        <Sidebar onSelectCurrency={handleSelectCurrency} currencies={currencies} />
      </ChatbotContainer>
    </Container>
  );
};

export default Chatbot;
