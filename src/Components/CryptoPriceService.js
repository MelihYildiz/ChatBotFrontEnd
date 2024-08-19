export const getCryptoPrice = async (crypto) => {
    try {
        const response = await fetch(`https://localhost:61756/api/crypto/${crypto}`);
        if (!response.ok) {
            throw new Error('Geçersiz kripto para birimi');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hata:', error);
        return null;
    }
};
