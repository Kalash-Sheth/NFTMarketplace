import { useSDK } from '@metamask/sdk-react';
import React, { useState } from 'react';
import './styles/WalletConnect.css'; // Scoped styling

const WalletConnect = ({ setWalletAddress }) => {
  const { sdk, connected } = useSDK();
  const [account, setAccount] = useState('');

  const connectMetaMask = async () => {
    try {
      const accounts = await sdk.connect();
      const wallet = accounts[0];
      setAccount(wallet);
      setWalletAddress(wallet); // Update parent with wallet address
    } catch (error) {
      console.error('Failed to connect to MetaMask', error);
    }
  };

  return (
    <div className="wallet-connect-container">
      <button 
        className={`connect-button ${connected ? 'connected' : ''}`}
        onClick={connectMetaMask}
      >
        {connected ? `Connected: ${account}` : 'Connect to MetaMask'}
      </button>
    </div>
  );
};

export default WalletConnect;
