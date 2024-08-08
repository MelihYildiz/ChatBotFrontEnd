import React from 'react';
import Chatbot from './Components/Chatbot';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
`;


function App() {
  return (
    <AppContainer>
      <Chatbot />
    </AppContainer>
  );
}

export default App;
