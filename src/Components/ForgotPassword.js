import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaEyeSlash, FaCopy, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Container stil tanımlaması: Formun genel yapısını kapsar
const Container = styled.div`
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
  position: relative;
`;

// BackButton stil tanımlaması: Geri butonu
const BackButton = styled.button`
  position: absolute;
  top: 15px;
  left: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: red;

  &:hover {
    color: black;
  }
`;

// Title stil tanımlaması: Başlık
const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

// Form stil tanımlaması: Kullanıcı adı giriş formu
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
`;

// Input stil tanımlaması: Kullanıcı adı giriş alanı
const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
`;

// Button stil tanımlaması: Şifre oluşturma butonu
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
  transition: background-color 0.5s ease;
  
  &:hover {
    background-color: #000000;
  }
`;

// ResultContainer stil tanımlaması: Şifre sonucunu kapsayan konteyner
const ResultContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  position: relative;
`;

// Result stil tanımlaması: Şifre metni
const Result = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

// IconContainer stil tanımlaması: İkonları kapsayan konteyner
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

// IconButton stil tanımlaması: İkon butonları (şifre gösterme/kopyalama)
const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;
  font-size: 20px;
  color: #007bff;
  transition: color 0.8s, transform 0.8s;

  &:hover {
    color: red; 
    transform: translateY(-10%) scale(1.15);
  }
`;

// ForgotPassword bileşeni: Şifre unuttum sayfası
const ForgotPassword = () => {
  const [username, setUsername] = useState(''); // Kullanıcı adı state'i
  const [generatedPassword, setGeneratedPassword] = useState(''); // Oluşturulan şifre state'i
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Şifrenin görünürlüğü state'i
  const navigate = useNavigate(); // useNavigate hook'unu kullan

  // Rastgele şifre oluşturma fonksiyonu
  const generateRandomPassword = () => {
    const length = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  // Form submit işlemi
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setGeneratedPassword(generateRandomPassword());
    }
  };

  // Şifreyi kopyalama fonksiyonu
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPassword);
    alert('Şifre kopyalandı!');
  };

  return (
    <Container>
      <BackButton onClick={() => navigate('/')}><FaArrowLeft /></BackButton> {/* Geri butonu */}
      <Title>Şifrenizi Mi Unuttunuz?</Title> {/* Başlık */}
      <Form onSubmit={handleSubmit}> {/* Form */}
        <Input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Kullanıcı adı değişikliği
        />
        <Button type="submit">Şifre Oluştur</Button> {/* Şifre oluşturma butonu */}
      </Form>
      {generatedPassword && (
        <ResultContainer> {/* Şifre sonucu */}
          <Result>
            {isPasswordVisible ? generatedPassword : '•••••••••••'} {/* Şifrenin görünürlüğü */}
          </Result>
          <IconContainer>
            <IconButton onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />} {/* Şifre görünürlük ikonu */}
            </IconButton>
            <IconButton onClick={handleCopy}>
              <FaCopy /> {/* Şifre kopyalama ikonu */}
            </IconButton>
          </IconContainer>
        </ResultContainer>
      )}
    </Container>
  );
};

export default ForgotPassword;
