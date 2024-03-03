import '../App.css';
import { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

const Ucenik = () => {
  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);

  useEffect(() => {
    const checkEthereumProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      if (provider) {
        handleAccountsChanged(await provider.request({ method: 'eth_accounts' }));
        provider.on('accountsChanged', handleAccountsChanged);
      }
    };

    checkEthereumProvider();

    return () => {
      // Cleanup the event listener when the component unmounts
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  const handleAccountsChanged = async (accounts: string[]) => {
    updateWallet({ accounts });
  };

  const updateWallet = (newState: any) => {
    setWallet((prevWallet) => ({ ...prevWallet, ...newState }));
  };

  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        updateWallet({ accounts });
        console.log('Connected:', accounts);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error.message || error);
      }
    } else {
      console.error('MetaMask extension not detected');
    }
  };

  return (
    <div className="App">
      <div className="header">
        <button onClick={handleConnect}>Connect MetaMask</button>
      </div>
      <div>Wallet Accounts: {wallet.accounts.join(', ')}</div>
    </div>
  );
};

export default Ucenik;
