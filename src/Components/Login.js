import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Login = ({ username, setUsername, handleLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <LoginContainer>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
        />
        <Button type="submit">Login</Button>
      </form>
    </LoginContainer>
  );
};

export default Login;
