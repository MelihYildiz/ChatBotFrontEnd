import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: #ffffff;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ChatInput = ({ value, onChange, onSendMessage }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSendMessage();
    }
  };

  return (
    <Container>
      <Input 
        type="text" 
        value={value} 
        onChange={onChange} 
        onKeyDown={handleKeyDown} 
        placeholder="Bir mesaj yazın..." 
      />
      <Button onClick={onSendMessage}>Gönder</Button>
    </Container>
  );
};

export default ChatInput;
