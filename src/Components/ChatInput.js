import React from 'react';
import styled from 'styled-components';

// Stil tanımlamaları
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const InputField = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  
`;

const SendButton = styled.button`
  background-color: #007bff;
    color: white;
    border-radius: 5px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    transition: background-color 0.8s;

  &:hover {
    background-color: #ADFF2F;
   
  }
`;

// ChatInput bileşeni
const ChatInput = ({ value, onChange, onSend }) => {
  // Enter tuşuna basıldığında mesajı gönder
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSend();
    }
  };

  return (
    <InputContainer>
      <InputField 
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
      <SendButton onClick={onSend}>Gönder</SendButton>
    </InputContainer>
  );
};

export default ChatInput;
