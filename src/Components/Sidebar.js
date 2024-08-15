import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled components
const SidebarContainer = styled.div`
  width: 250px;
  height: 800px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Adds scrollbar */
  position: relative;
`;

const SidebarTitle = styled.h2`
  margin: 0 0 10px;
  font-size: 18px;
  color: #007BFF;
  text-align: center;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Item = styled.div`
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer; /* Indicate that it's clickable */
`;

const AddButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
`;

const AddForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

const TextInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Sidebar = ({ onSelectCurrency }) => {
  const [currencies, setCurrencies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');

  // Fetch symbols from the API
  const fetchSymbols = async () => {
    try {
      const response = await axios.get('http://localhost:61756/api/crypto/symbols');
      setCurrencies(response.data);
    } catch (error) {
      console.error('Error fetching symbols:', error);
    }
  };

  // Fetch symbols on component mount
  useEffect(() => {
    fetchSymbols();

    // Set up an interval to fetch symbols every 10 seconds
    const intervalId = setInterval(fetchSymbols, 10000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleAddButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleAddCurrency = async () => {
    if (symbol.length > 4 || !/^[A-Z]+$/.test(symbol)) {
      alert('Symbol must be uppercase and up to 4 characters long.');
      return;
    }

    try {
      await axios.post('http://localhost:61756/api/crypto/add', {
        symbol: symbol.toUpperCase(),
        name
      });
      setShowForm(false);
      setSymbol('');
      setName('');
      fetchSymbols(); // Fetch updated symbols list
    } catch (error) {
      console.error('Error adding symbol:', error);
    }
  };

  return (
    <SidebarContainer>
      <SidebarTitle>Symbols</SidebarTitle>
      <AddButton onClick={handleAddButtonClick}>
        {showForm ? '-' : '+'}
      </AddButton>
      {showForm && (
        <AddForm>
          <TextInput
            type="text"
            placeholder="Symbol (4 chars max, uppercase)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            maxLength={4}
          />
          <TextInput
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <AddButton onClick={handleAddCurrency}>Add</AddButton>
        </AddForm>
      )}
      <ItemList>
        {currencies.map((currency, index) => (
          <Item key={index} onClick={() => onSelectCurrency(currency.symbol)}>
            {currency.symbol} - {currency.name}
          </Item>
        ))}
      </ItemList>
    </SidebarContainer>
  );
};

export default Sidebar;
