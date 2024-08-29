import React from 'react';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Göz ikonları için

// Ana Konteyner
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; 
  width:210vh;
  background-color: #f0f0f0; 
  position: relative; 
`;

// Stil tanımlamaları
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px; 
  margin: auto; 
  height: auto; 
  box-sizing: border-box; 
`;

const Logo = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 150px; 
  height: auto; 
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%; 
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: calc(100% - 20px); /* Tam genişlikten 20px eksiltildi (sol ve sağ için toplam 20px) */
  margin-left: 10px; 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 25px;
  background-color: #ff0000;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;
  align-self: center;
  transition: background-color 0.8s;


  &:hover {
    background-color: #000000;
  }
`;

const ForgotPasswordLink = styled.a`
  display: block;
  margin-top: 10px;
  color: #007bff;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const EyeIcon = styled.div`
  position: absolute;
  top: 53%;
  right: 20px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #007bff;
  transition: color 0.8s, transform 0.8s; 

  &:hover {
    color: red; 
    transform: translateY(-50%) scale(1.2);
  }

`;

const Login = ({ username, setUsername, password, setPassword, handleLogin }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AppContainer>
      <Logo src="/logo.png" alt="Logo" />
      <LoginContainer>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <InputContainer>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <EyeIcon onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </EyeIcon>
          </InputContainer>
          <Button type="submit">Login</Button>
          <ForgotPasswordLink href="/forgot-password">Şifrenizi mi unuttunuz?</ForgotPasswordLink>
        </form>
      </LoginContainer>
    </AppContainer>
  );
};

export default Login;
