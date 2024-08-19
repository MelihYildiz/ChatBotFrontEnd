import React, { useState, useEffect } from 'react';
import Chatbot from './Components/Chatbot';
import Login from './Components/Login';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const Header = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin-right: 10px;
  font-weight: bold;
  background-color: #fff;
  padding: 5px;
  border-radius: 5px;
`;

const LogoutButton = styled.button`
  padding: 5px 10px;
  background-color: #ff4d4d;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #cc0000;
  }
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem('username', username);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('username');
    setUsername('');
  };

  return (
    <AppContainer>
      {isLoggedIn ? (
        <>
          <Header>
            <UserName>{username}</UserName>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </Header>
          <Chatbot username={username} />
        </>
      ) : (
        <Login username={username} setUsername={setUsername} handleLogin={handleLogin} />
      )}
    </AppContainer>
  );
}

export default App;
