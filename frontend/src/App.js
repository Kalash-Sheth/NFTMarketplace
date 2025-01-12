import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import NFTDashboard from './components/NFTDashboard';
import MintNFT from './components/MintNFT';
import TransferNFT from './components/TransferNFT';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>NFT Marketplace</h1>
        <p className="header-subtext">
          Connect your wallet to explore, mint, and transfer NFTs seamlessly.
        </p>
        <WalletConnect setWalletAddress={setWalletAddress} />
        <div className="navigation-buttons">
          <button onClick={() => scrollToSection('nft-dashboard')}>View NFTs</button>
          <button onClick={() => scrollToSection('mint-transfer')}>Mint & Transfer NFT</button>
        </div>
      </header>

      <main className="app-main">
        <section id="nft-dashboard" className="nft-dashboard">
          <NFTDashboard walletAddress={walletAddress} />
        </section>
        <section id="mint-transfer" className="mint-transfer-section">
          <MintNFT walletAddress={walletAddress} className="mint-nft" />
          <TransferNFT walletAddress={walletAddress} className="transfer-nft" />
        </section>
      </main>
    </div>
  );
}

export default App;
