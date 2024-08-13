import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #ffffff;
  border-left: 1px solid #ddd;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Button = styled.button`
  background-color: #007BFF;
  color: #ffffff;
  border: none;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }
`;

const Sidebar = ({ onSelectCurrency }) => {
  const currencies = [
    { code: 'BTC', name: 'Bitcoin' },
    { code: 'ETH', name: 'Ethereum' },
    { code: 'XRP', name: 'Ripple' },
    { code: 'SOL', name: 'Solana' },
    { code: 'ADA', name: 'Cardano' },
    { code: 'DOT', name: 'Polkadot' },
    { code: 'DOGE', name: 'Doge Coin' },
    { code: 'BNB', name: 'Binance Coin' },
    { code: 'AVAX', name: 'Avalanche' },
    { code: 'GT', name: 'Gate Coin' },
    { code: 'XLM', name: 'Stellar' },
    { code: 'YFI', name: 'Yearn.Finance' },

    // Daha fazla kripto para birimi ekleyebilirsiniz
  ];

  return (
    <SidebarContainer>
      {currencies.map(currency => (
        <Button key={currency.code} onClick={() => onSelectCurrency(currency.code)}>
          {currency.code} - {currency.name}
        </Button>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
