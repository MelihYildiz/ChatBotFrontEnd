import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  border-top: 1px solid #ccc;
  padding: 10px;
  background: #fff;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 15px 20px;
  border: none;
  border-radius: 20px;
  background-color: #007BFF;
  color: #fff;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ChatInput = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      await onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <InputContainer>
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Fiyatını öğrenmek istediğiniz kripto parayı buraya yazın."
      />
      <Button onClick={handleSend}>Gönder</Button>
    </InputContainer>
  );
};

export default ChatInput;
