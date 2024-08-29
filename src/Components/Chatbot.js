import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import Sidebar from './Sidebar';
import axios from 'axios';

// Stil tanımlamaları
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Logo = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 150px; /* Logo genişliği */
  height: auto; /* Logo yüksekliğini otomatik ayarla */
`;

const ChatbotContainer = styled.div`
  width: 1200px;
  height: 820px;
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
  border-top-right-radius: 0px;
  text-align: center;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ChatLog = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  border-bottom: 1px solid #ddd;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Message = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  background-color: ${props => (props.isUser ? '#DCF8C6' : '#z')};
  align-self: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  border-radius: ${props =>
    props.isUser ? '20px 0 20px 0' : '0 20px 0 20px'};
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Fiyatı belirli bir formatta gösterir
const formatPrice = (price) => {
  return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

// HTTP durum mesajlarını saklayan obje
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

// Durum koduna göre mesaj döndürür
const getStatusMessage = (status) => {
  return statusMessages[status] || 'Bilinmeyen Durum';
};

// API'den sembolleri alır
const fetchSymbols = async () => {
  try {
    const response = await axios.get('http://localhost:61756/api/crypto/symbols');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch symbols:', getStatusMessage(response.status));
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch symbols:', error.message);
    return [];
  }
};

// Yeni sembol ekler
const addNewCurrency = async (symbol, name) => {
  try {
    const response = await axios.post('http://localhost:61756/api/crypto/add', {
      symbol: symbol.toUpperCase(),
      name
    });
    if (response.status === 200) {
      return await fetchSymbols(); // Güncellenmiş sembol listesini döndürür
    } else {
      console.error('Failed to add symbol:', getStatusMessage(response.status));
      return null;
    }
  } catch (error) {
    console.error('Failed to add symbol:', error.message);
    return null;
  }
};

// Sembol bazında kripto fiyatlarını alır
const fetchCryptoPrices = async (symbol) => {
  try {
    const response = await axios.get(`http://localhost:61756/api/crypto/${symbol}`);
    console.log('API Yanıtı:', response); // Yanıtı günlüğe kaydedin
    if (response.status === 200) {
      return { data: response.data, status: response.status };
    }
    console.error('Failed to fetch crypto prices:', getStatusMessage(response.status));
    return { data: null, status: response.status };
  } catch (error) {
    console.error('Failed to fetch crypto prices:', error.message);
    return { data: null, status: error.response?.status || 500 };
  }
};

const Chatbot = ({ username }) => {
  const [messages, setMessages] = useState([]); // Mesajları tutar
  const [inputValue, setInputValue] = useState(''); // Input alanındaki değeri tutar
  const [currencies, setCurrencies] = useState([]); // Sembolleri tutar
  const chatLogRef = useRef(null);

  // Kullanıcının önceki mesajlarını localStorage'dan yükler
  useEffect(() => {
    const savedMessages = localStorage.getItem(`messages_${username}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [username]);

  // Mesajlar değiştikçe localStorage'a kaydeder
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`messages_${username}`, JSON.stringify(messages));
    }
  }, [messages, username]);

  // Mesaj geldiğinde chat log'un en altına scroll yapar
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  // Bileşen yüklendiğinde sembolleri yükler
  useEffect(() => {
    const loadSymbols = async () => {
      const symbols = await fetchSymbols();
      setCurrencies(symbols);
    };
    loadSymbols();
  }, []);

  // Mesaj gönderme işlemini yönetir
  const handleSendMessage = async (message) => {
    const newMessages = [...messages, { text: message, isUser: true }];
    setMessages(newMessages);

    // Kripto para fiyatını getirir ve kullanıcıya gösterir
    const { data, status } = await fetchCryptoPrices(message.toUpperCase());

    if (data && data.price !== undefined && data.symbol && data.price >= 0) {
      const priceString = data.price.toString();
      const cleanedPrice = priceString.replace(/[^0-9]/g, '');
      const formattedPrice = formatPrice(parseInt(cleanedPrice, 10));

      setMessages((prevMessages) => [
        ...prevMessages,
        { 
          text: `Kripto Para: ${data.symbol.trim()}, Fiyat: ${formattedPrice}`, 
          isUser: false 
        }
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Hata: ${message} için geçerli bir fiyat alınamadı. HTTP Durum Kodu: ${status} (${getStatusMessage(status)})`, isUser: false }
      ]);
    }

    setInputValue(''); // Mesaj gönderildikten sonra input alanını sıfırlar
  };

  // Yan panelden seçilen sembolü input alanına ekler
  const handleSelectCurrency = (currencyCode) => {
    setInputValue(currencyCode);
  };

  return (
    <Container>
      <Logo src="/logo.png" alt="Logo" />
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
            onSend={() => handleSendMessage(inputValue)}
          />
        </ChatContainer>
        <Sidebar 
          currencies={currencies} 
          onSelectCurrency={handleSelectCurrency}
        />
      </ChatbotContainer>
    </Container>
  );
};

export default Chatbot;