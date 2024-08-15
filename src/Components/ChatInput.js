import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: #fff;
`;

const InputField = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007BFF;
  color: #fff;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ChatInput = ({ value, onChange, onSendMessage }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <InputContainer>
      <InputField
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyPress}
        placeholder="Mesajınızı yazın..."
      />
      <SendButton onClick={onSendMessage}>Gönder</SendButton>
    </InputContainer>
  );
};

export default ChatInput;
