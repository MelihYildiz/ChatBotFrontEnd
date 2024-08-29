import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chatbot from './Components/Chatbot';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 97vh;
  background: linear-gradient(135deg, #e2e2e2, #ffffff);
`;

const Header = styled.div`
  position: fixed;
  top: 20px; /* Banner'ın altında olması için ayarlandı */
  right: 10px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const UserName = styled.span`
  margin-right: 15px;
  font-weight: bold;
  color: #333;
  background-color: #f9f9f9;
  padding: 8px 12px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoutButton = styled.button`
  padding: 8px 16px;
  background-color: #ff6b6b;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4a4a;
  }
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kullanıcının giriş durumu
  const [username, setUsername] = useState(''); // Kullanıcı adı durumu
  const [password, setPassword] = useState(''); // Şifre durumu eklendi

  useEffect(() => {
    const storedUsername = localStorage.getItem('username'); // Kullanıcı adı yerel depolamadan alınıyor
    if (storedUsername) {
      setUsername(storedUsername); // Kullanıcı adı ayarlanıyor
      setIsLoggedIn(true); // Giriş durumu güncelleniyor
    }
  }, []);

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem('username', username); // Kullanıcı adı yerel depolamaya kaydediliyor
      setIsLoggedIn(true); // Giriş durumu güncelleniyor
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Giriş durumu sıfırlanıyor
    localStorage.removeItem('username'); // Kullanıcı adı yerel depolamadan siliniyor
    setUsername(''); // Kullanıcı adı sıfırlanıyor
    setPassword(''); // Şifre sıfırlanıyor
  };

  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={isLoggedIn ? (
            <>
              <Header>
                <UserName>{username}</UserName> {/* Kullanıcı adı görüntüleniyor */}
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton> {/* Çıkış butonu */}
              </Header>
              <Chatbot username={username} /> {/* Chatbot bileşeni */}
            </>
          ) : (
            <Login
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword} // Şifreyi güncelleyen fonksiyon eklendi
              handleLogin={handleLogin} // Giriş yapma fonksiyonu
            />
          )} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Şifremi Unuttum sayfası */}
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
