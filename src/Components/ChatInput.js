import React from 'react';
import styled from 'styled-components';
import axios from 'axios';


// Input alanını ve butonu içeren konteyner stil tanımı
const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: #fff;
`;

// Kullanıcının mesajını yazdığı input alanı için stil tanımı
const InputField = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-right: 10px;
`;

// Gönder butonu için stil tanımı
const SendButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007BFF;
  color: #fff;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;

  // Hover durumunda butonun arka plan rengini değiştirir
  &:hover {
    background-color: #0056b3;
  }
`;

// ChatInput bileşeni, mesaj yazma ve gönderme işlemlerini yönetir
const ChatInput = ({ value, onChange, onSendMessage }) => {
  

  // Kullanıcı 'Enter' tuşuna bastığında mesajı gönderir
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <InputContainer>
      <InputField
        type="text"
        value={value} // Input alanındaki mevcut değeri tutar
        onChange={onChange} // Input alanındaki değişiklikleri yönetir
        onKeyDown={handleKeyPress} // 'Enter' tuşuna basıldığında çağrılır
        placeholder="Mesajınızı yazın..." // Input alanı için placeholder metni
      />
      <SendButton onClick={onSendMessage}>Gönder</SendButton> {/* Gönder butonuna tıklanıldığında mesaj gönderme işlemini tetikler */}
    </InputContainer>
  );
};

export default ChatInput;
