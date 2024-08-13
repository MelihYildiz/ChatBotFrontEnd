import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 300px;
  padding: 20px;
  border-left: 2px solid #ccc;
  background-color: #f4f4f4;
  height: 90%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  right: -10px; /* Paneli sağa kaydır */
  top: 0;
  border-radius: 10px 0 0 10px; /* Köşe yuvarlama */
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
  font-size: 1em;
  color: #555;
  border-bottom: 1px solid #ddd; /* Liste öğeleri arasında çizgi */
  padding-bottom: 5px;
  transition: color 0.3s, background-color 0.3s;

  &:hover {
    color: #b31010;
    background-color: #f1f2d3;
    cursor: pointer;
    border-radius: 10px
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Section>
        <Title>Kripto Paralar</Title>
        <List>
          <ListItem>BTC - Bitcoin</ListItem>
          <ListItem>ETH - Ethereum</ListItem>
          <ListItem>LTC - Litecoin</ListItem>
          <ListItem>BCH - Bitcoin Cash</ListItem>
          <ListItem>BNB - Binance Coin</ListItem>
          <ListItem>EOS - EOS</ListItem>
          <ListItem>XRP - Ripple</ListItem>
          <ListItem>XLM - Stellar</ListItem>
          <ListItem>LINK - Chainlink</ListItem>
          <ListItem>DOT - Polkadot</ListItem>
          <ListItem>YFI - Yearn.finance</ListItem>
        </List>
      </Section>
     
    </SidebarContainer>
  );
};

export default Sidebar;
