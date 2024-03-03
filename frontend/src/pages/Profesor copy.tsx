import React, { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import BlockGradeABI from '../../BlockGrade.json';  // Adjust the path accordingly

const Profesor = () => {
  const initialState = { accounts: [], chainId: null };
  const [wallet, setWallet] = useState(initialState);
  const [connected, setConnected] = useState(false);
  const [blockGradeContract, setBlockGradeContract] = useState(null);

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
      // Cleanup the event listeners when the component unmounts
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
      const contractInstance = new web3.eth.Contract(BlockGradeABI.abi, '0x40775d3e436eb449cf44cfda4c77f756d897e0fb');  // Replace 'YOUR_CONTRACT_ADDRESS' with the actual address

      setBlockGradeContract(contractInstance);
    }
  };

  const handleChainChanged = async (chainId) => {
    updateWallet({ chainId });
  };

  const handleAccountsChanged = async (accounts) => {
    updateWallet({ accounts });
    setConnected(true); // Set connected to true when accounts change
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

        console.log('Connected:', accounts, 'ChainId:', chainId);
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
  };

  const handleInteractWithContract = async () => {
    if (blockGradeContract) {
      try {
        // Example: Call a function from your smart contract
        const result = await blockGradeContract.methods.someFunction().call();
        console.log('Smart contract result:', result);
      } catch (error) {
        console.error('Error interacting with smart contract:', error.message || error);
      }
    }
  };

    // Function to handle getting school details by ID
    const handleGetSchoolById = async () => {
        if (blockGradeContract) {
        try {
            // Example: Call the function for getting school details by ID
            const schoolId = 1; // Replace with the desired school ID
            const schoolDetails = await blockGradeContract.methods.skole(schoolId).call();
            console.log('School Details:', schoolDetails);
        } catch (error) {
            console.error('Error getting school details:', error.message || error);
        }
        }
    };
  
// Function to add a school
    const addSchool = async (skolaId, naziv, direktor) => {
        if (blockGradeContract) {
        try {
            await blockGradeContract.methods.dodajSkolu(skolaId, naziv, direktor).send({ from: wallet.accounts[0] });
            console.log('School added successfully!');
        } catch (error) {
            console.error('Error adding school:', error.message || error);
        }
        }
    };
    
    // Function to delete a school
    const deleteSchool = async (skolaId) => {
        if (blockGradeContract) {
        try {
            await blockGradeContract.methods.obrisiSkolu(skolaId).send({ from: wallet.accounts[0] });
            console.log('School deleted successfully!');
        } catch (error) {
            console.error('Error deleting school:', error.message || error);
        }
        }
    };
    
    // Function to set the director of a school
    const setDirector = async (skolaId, direktor) => {
        if (blockGradeContract) {
        try {
            await blockGradeContract.methods.postaviDirektora(skolaId, direktor).send({ from: wallet.accounts[0] });
            console.log('Director set successfully!');
        } catch (error) {
            console.error('Error setting director:', error.message || error);
        }
        }
    };
    
    // Function to change the owner of the contract
    const changeOwner = async (noviVlasnik) => {
        if (blockGradeContract) {
        try {
            await blockGradeContract.methods.promijeniVlasnika(noviVlasnik).send({ from: wallet.accounts[0] });
            console.log('Owner changed successfully!');
        } catch (error) {
            console.error('Error changing owner:', error.message || error);
        }
        }
    };
    
    // Function to add a teacher to a school
    const addTeacher = async (skolaId, profesorId, ime, profesorAdresa, predmetId) => {
        if (blockGradeContract) {
        try {
            await blockGradeContract.methods.dodajProfesoraSkoli(skolaId, profesorId, ime, profesorAdresa, predmetId).send({ from: wallet.accounts[0] });
            console.log('Teacher added successfully!');
        } catch (error) {
            console.error('Error adding teacher:', error.message || error);
        }
        }
    };
    
    // Function to add a student to a school
    const addStudent = async (skolaId, ucenikId, odjel) => {
        if (blockGradeContract) {
        try {
            await blockGradeContract.methods.dodajUcenikaSkoli(skolaId, ucenikId, odjel).send({ from: wallet.accounts[0] });
            console.log('Student added successfully!');
        } catch (error) {
            console.error('Error adding student:', error.message || error);
        }
        }
    };
    
    // Function to add a grade to a school
    const addGrade = async (skolaId, profesorId, ucenikId, predmetId, ocjena) => {
        if (blockGradeContract) {
        try {
            await blockGradeContract.methods.dodajOcenuSkoli(skolaId, profesorId, ucenikId, predmetId, ocjena).send({ from: wallet.accounts[0] });
            console.log('Grade added successfully!');
        } catch (error) {
            console.error('Error adding grade:', error.message || error);
        }
        }
    };
    
    // Function to add a note
    const addNote = async (ucenikId, predmetniNastavnikId, predmetId, datum, sadrzaj) => {
        if (blockGradeContract) {
        try {
            await blockGradeContract.methods.dodajBiljesku(ucenikId, predmetniNastavnikId, predmetId, datum, sadrzaj).send({ from: wallet.accounts[0] });
            console.log('Note added successfully!');
        } catch (error) {
            console.error('Error adding note:', error.message || error);
        }
        }
    };
    
    // Function to get school details by ID
    const getSchoolById = async (skolaId) => {
        if (blockGradeContract) {
        try {
            const schoolDetails = await blockGradeContract.methods.skole(skolaId).call();
            console.log('School Details:', schoolDetails);
        } catch (error) {
            console.error('Error getting school details:', error.message || error);
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
            <button onClick={handleGetSchoolById}>Interact with Smart Contract</button>
          </div>
        ) : (
          <button onClick={handleConnect}>Connect MetaMask</button>
        )}
      </div>
      {connected && <div>Wallet Accounts: {wallet.accounts.join(', ')}</div>}
    </div>
  );
};

export default Profesor;
