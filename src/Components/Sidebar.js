import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Stil tanımlamaları
const SidebarContainer = styled.div`
  width: 300px;
  background-color: #007BFF;
  color: #ffffff;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const CurrencyItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const AddButton = styled.button`
  background-color: #007BFF;
  color: #ffffff;
  border: 1px solid #ffffff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background-color: #17D5FF;
  }
`;

// Yeni kripto para ekleme işlevini temsil eden bir modal veya form bileşeni
const AddSymbolModal = ({ onAdd }) => {
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');

  // Sembolün değişimini işler
  const handleSymbolChange = (e) => {
    const value = e.target.value.toUpperCase(); // Harfleri büyük yap
    if (value.length <= 4) {
      setSymbol(value);
    } else {
      alert('Sembol 4 karakterden uzun olamaz.');
    }
  };

  // İsmlerin değişimini işler
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 25) {
      setName(value);
    } else {
      alert('İsim 25 karakterden uzun olamaz.');
    }
  };

  // Formu gönderme işlemi
  const handleSubmit = (e) => {
    e.preventDefault();
    if (symbol && name) {
      onAdd({ symbol, name });
      setSymbol('');
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Sembol" 
        value={symbol}
        onChange={handleSymbolChange}
        maxLength="4"
        onKeyPress={(e) => {
          if (symbol.length >= 4 && e.key !== 'Backspace' && e.key !== 'Tab') {
            e.preventDefault();
            alert('Sembol 4 karakterden uzun olamaz.');
          }
        }}
      />
      <input 
        type="text" 
        placeholder="İsim" 
        value={name}
        onChange={handleNameChange}
        maxLength="25"
        onKeyPress={(e) => {
          if (name.length >= 25 && e.key !== 'Backspace' && e.key !== 'Tab') {
            e.preventDefault();
            alert('İsim 25 karakterden uzun olamaz.');
          }
        }}
      />
      <button type="submit">Ekle</button>
    </form>
  );
};

const Sidebar = ({ onSelectCurrency }) => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // API'den veri çekme işlevi
  const fetchCurrencies = async () => {
    try {
      const response = await fetch('http://localhost:61756/api/Crypto');
      if (!response.ok) {
        throw new Error('API isteği başarısız oldu.');
      }
      const data = await response.json();
      setCurrencies(data);
      setError(null); 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Bileşen yüklendiğinde veri çekme
  useEffect(() => {
    const fetchInterval = async () => {
      while (true) {
        await fetchCurrencies();
        await new Promise((resolve) => setTimeout(resolve, 10000)); // 10 saniye bekle
      }
    };

    fetchInterval(); // Fonksiyonu çağır

    // Bileşen unmounted olduğunda interval temizlenir
    return () => clearInterval(fetchInterval);
  }, []);

  // Yeni bir kripto para ekler
  const handleAddCurrency = async (newCurrency) => {
    try {
      const response = await fetch('http://localhost:61756/api/Crypto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCurrency),
      });
      if (!response.ok) {
        throw new Error('Yeni kripto para ekleme başarısız oldu.');
      }
      const addedCurrency = await response.json();
      setCurrencies([...currencies, addedCurrency]);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <SidebarContainer>Yükleniyor...</SidebarContainer>;
  }

  if (error) {
    return <SidebarContainer>Hata: {error}</SidebarContainer>;
  }

  return (
    <SidebarContainer>
      <AddButton onClick={() => setShowAddModal(true)}>+</AddButton>
      {showAddModal && (
        <AddSymbolModal 
          onAdd={(newCurrency) => {
            handleAddCurrency(newCurrency);
            setShowAddModal(false);
          }} 
        />
      )}
      {currencies.length > 0 ? (
        currencies.map((currency, index) => (
          <CurrencyItem 
            key={index}
            onClick={() => onSelectCurrency(currency.symbol)}
          >
            {currency.symbol} - {currency.name}
          </CurrencyItem>
        ))
      ) : (
        <div>Kripto para verisi bulunamadı.</div>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
