import React, { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import BlockGradeABI from '../../BlockGrade.json';

const Profesor = () => {
  const initialState = { accounts: [], chainId: null };
  const [wallet, setWallet] = useState(initialState);
  const [connected, setConnected] = useState(false);
  const [blockGradeContract, setBlockGradeContract] = useState(null);

  // Screen state
  const [currentScreen, setCurrentScreen] = useState(1);

  const [studentName, setStudentName] = useState('');
  const [description, setDescription] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [issuedCertificateId, setIssuedCertificateId] = useState(null);

  useEffect(() => {
    const checkEthereumProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      if (provider) {
        handleChainChanged(await provider.request({ method: 'eth_chainId' }));
        handleAccountsChanged(await provider.request({ method: 'eth_accounts' }));
        provider.on('chainChanged', handleChainChanged);
        provider.on('accountsChanged', handleAccountsChanged);
      }
    };

    checkEthereumProvider();

    return () => {
      window.ethereum?.removeListener('chainChanged', handleChainChanged);
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  useEffect(() => {
    if (connected) {
      initializeContract();
    }
  }, [connected]);

  const initializeContract = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const contractInstance = new web3.eth.Contract(
        BlockGradeABI.abi,
        '0xf7109ebbe9e8fdaee66a8806c6645cb0bfe31f71' // Zamijenite sa svojom adresom ugovora
      );

      setBlockGradeContract(contractInstance);
    }
  };

  const handleChainChanged = async (chainId) => {
    updateWallet({ chainId });
  };

  const handleAccountsChanged = async (accounts) => {
    updateWallet({ accounts });
    setConnected(true);
  };

  const updateWallet = (newState) => {
    setWallet((prevWallet) => ({ ...prevWallet, ...newState }));
  };

  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const chainId = await web3.eth.getChainId();

        updateWallet({ accounts, chainId });
        setConnected(true);
        setCurrentScreen(1);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error.message || error);
      }
    } else {
      console.error('MetaMask extension not detected');
    }
  };

  const handleDisconnect = () => {
    setConnected(false);
    setWallet(initialState);
    setBlockGradeContract(null);
    setCurrentScreen(0);
  };

  const issueCertificate = async () => {
    if (blockGradeContract) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const sender = accounts[0];

        const receipt = await blockGradeContract.methods
          .izdajUvjerenje(studentName, description, subjects, grades)
          .send({ 
            from: sender,
            gasPrice: '25000000' // Optional: You can set the gas price in Wei (2.5 Gwei in Wei)
           });

        // Access the logs to get the emitted event data
        const logs = receipt.events.UvjerenjeIzdano.returnValues;

        // Extract the certificate ID from the logs
        const certificateId = logs.id.slice(0, -48);
        console.log('Certificate ID:', certificateId);
        setIssuedCertificateId(certificateId);
        setCurrentScreen(2);
      } catch (error) {
        console.error('Error issuing certificate:', error.message || error);
      }
    }
  };

  return (
    <div className="App">
      <div className="header">
        {connected ? (
          <div>
            <h2>Connected to Blockchain</h2>
            <p>ChainId: {wallet.chainId}</p>
            <button onClick={handleDisconnect}>Disconnect</button>
          </div>
        ) : (
          <button onClick={handleConnect}>Connect MetaMask</button>
        )}
      </div>

      {currentScreen === 1 && connected && (
        <div>
          <h3>Issue Certificate</h3>
          <label htmlFor="studentName">Student Name:</label>
          <input
            type="text"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="subjects">Subjects (comma-separated):</label>
          <input
            type="text"
            id="subjects"
            value={subjects.join(',')}
            onChange={(e) => setSubjects(e.target.value.split(','))}
          />
          <label htmlFor="grades">Grades (comma-separated):</label>
          <input
            type="text"
            id="grades"
            value={grades.join(',')}
            onChange={(e) => setGrades(e.target.value.split(','))}
          />
          <button onClick={issueCertificate}>Issue Certificate</button>
        </div>
      )}

      {currentScreen === 2 && connected && issuedCertificateId && (
        <div>
          <h3>Certificate Issued</h3>
          <p>Certificate ID: {issuedCertificateId}</p>
          {/* Display other certificate details if needed */}
        </div>
      )}
    </div>
  );
};

export default Profesor;
