import '../App.css'
import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'; // Dodajte ovu liniju

const Profesor = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const initialState = { accounts: [] } 
  const [wallet, setWallet] = useState(initialState) 
  const [blockGradeContract, setBlockGradeContract] = useState(null); // Dodajte ovu liniju

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))
      
      if (provider) {
        const web3 = new Web3(provider);
        const networkId = await web3.eth.net.getId();
        const contractData = require('../../pametni_ugovor/BlockGrade.json'); // Zamijenite s putanjom do vašeg pametnog ugovora
        const deployedNetwork = contractData.networks[networkId];

        const contract = new web3.eth.Contract(
          contractData.abi,
          deployedNetwork && deployedNetwork.address,
        );

        setBlockGradeContract(contract);
      }
    }
    getProvider();
  }, []);

  const updateWallet = async (accounts: any) => {
    setWallet({ accounts });
  }  

  const handleConnect = async () => {  
    if (blockGradeContract) {
      let accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      updateWallet(accounts);
    } else {
      console.error("Pametni ugovor nije inicijaliziran.");
    }
  }

  return (
    <div className="App">
      <div className='header'>
        {hasProvider && 
          <button onClick={handleConnect}>Connect MetaMask</button>
        }
      </div>
   
      {wallet.accounts.length > 0 && blockGradeContract && 
        <div>
          Wallet Accounts: {wallet.accounts[0]}
          {/* Dodajte ovdje kod za interakciju s pametnim ugovorom */}
        </div>
      }
    </div>
  )
}

export default Profesor;
