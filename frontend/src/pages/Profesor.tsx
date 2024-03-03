import React, { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import BlockGradeABI from '../../BlockGrade.json';

const Profesor = () => {
  const initialState = { accounts: [], chainId: null };
  const [wallet, setWallet] = useState(initialState);
  const [connected, setConnected] = useState(false);
  const [blockGradeContract, setBlockGradeContract] = useState(null);

  const [schoolId, setSchoolId] = useState('');
  const [naziv, setNaziv] = useState('');
  const [direktor, setDirektor] = useState('');
  const [profesorId, setProfesorId] = useState('');
  const [ime, setIme] = useState('');
  const [noviVlasnik, setNoviVlasnik] = useState('');
  const [schoolDetails, setSchoolDetails] = useState(null);


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
        '0x40775d3e436eb449cf44cfda4c77f756d897e0fb' // Replace with your contract address
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

        // You can also perform additional UI updates or navigate to a different page upon successful connection
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

  const addSchool = async () => {
    if (blockGradeContract) {
      try {
        await blockGradeContract.methods
          .dodajSkolu(schoolId, naziv, direktor)
          .send({ from: wallet.accounts[0] });

        // Perform UI updates or show a success message to the user
        alert('School added successfully!');
      } catch (error) {
        console.error('Error adding school:', error.message || error);

        // Perform UI updates or show an error message to the user
        alert('Error adding school. Please try again.');
      }
    }
  };

  const deleteSchool = async () => {
    if (blockGradeContract) {
      try {
        await blockGradeContract.methods.obrisiSkolu(schoolId).send({ from: wallet.accounts[0] });

        // Perform UI updates or show a success message to the user
        alert('School deleted successfully!');
      } catch (error) {
        console.error('Error deleting school:', error.message || error);

        // Perform UI updates or show an error message to the user
        alert('Error deleting school. Please try again.');
      }
    }
  };

  const setDirector = async () => {
    if (blockGradeContract) {
      try {
        await blockGradeContract.methods.postaviDirektora(schoolId, direktor).send({ from: wallet.accounts[0] });

        // Perform UI updates or show a success message to the user
        alert('Director set successfully!');
      } catch (error) {
        console.error('Error setting director:', error.message || error);

        // Perform UI updates or show an error message to the user
        alert('Error setting director. Please try again.');
      }
    }
  };

  const checkSchoolExistence = async () => {
    if (blockGradeContract) {
      try {
        const details = await blockGradeContract.methods.skole(schoolId).call();
        setSchoolDetails(details);
      } catch (error) {
        console.error('Error checking school existence:', error.message || error);
        setSchoolDetails(null);
      }
    }
  };

  const changeOwner = async () => {
    if (blockGradeContract) {
      try {
        await blockGradeContract.methods.promijeniVlasnika(noviVlasnik).send({ from: wallet.accounts[0] });

        // Perform UI updates or show a success message to the user
        alert('Owner changed successfully!');
      } catch (error) {
        console.error('Error changing owner:', error.message || error);

        // Perform UI updates or show an error message to the user
        alert('Error changing owner. Please try again.');
      }
    }
  };

  const addTeacher = async () => {
    if (blockGradeContract) {
      try {
        await blockGradeContract.methods
          .dodajProfesoraSkoli(schoolId, profesorId, ime)
          .send({ from: wallet.accounts[0] });

        // Perform UI updates or show a success message to the user
        alert('Teacher added successfully!');
      } catch (error) {
        console.error('Error adding teacher:', error.message || error);

        // Perform UI updates or show an error message to the user
        alert('Error adding teacher. Please try again.');
      }
    }
  };

  const addStudent = async () => {
    if (blockGradeContract) {
      try {
        await blockGradeContract.methods.dodajUcenikaSkoli(schoolId).send({ from: wallet.accounts[0] });

        // Perform UI updates or show a success message to the user
        alert('Student added successfully!');
      } catch (error) {
        console.error('Error adding student:', error.message || error);

        // Perform UI updates or show an error message to the user
        alert('Error adding student. Please try again.');
      }
    }
  };

  const addGrade = async () => {
    if (blockGradeContract) {
      try {
        await blockGradeContract.methods
          .dodajOcenuSkoli(schoolId, profesorId, ime)
          .send({ from: wallet.accounts[0] });

        // Perform UI updates or show a success message to the user
        alert('Grade added successfully!');
      } catch (error) {
        console.error('Error adding grade:', error.message || error);

        // Perform UI updates or show an error message to the user
        alert('Error adding grade. Please try again.');
      }
    }
  };

  const addNote = async () => {
    if (blockGradeContract) {
      try {
        await blockGradeContract.methods.dodajBiljesku().send({ from: wallet.accounts[0] });

        // Perform UI updates or show a success message to the user
        alert('Note added successfully!');
      } catch (error) {
        console.error('Error adding note:', error.message || error);

        // Perform UI updates or show an error message to the user
        alert('Error adding note. Please try again.');
      }
    }
  };

  const getSchoolById = async () => {
    if (blockGradeContract) {
      try {
        const schoolDetails = await blockGradeContract.methods.skole(schoolId).call();

        // Perform UI updates or use the retrieved data in your application
        console.log('School Details:', schoolDetails);
      } catch (error) {
        console.error('Error getting school details:', error.message || error);

        // Perform UI updates or show an error message to the user
        alert('Error getting school details. Please try again.');
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

      {connected && (
        <div>
          <div>Wallet Accounts: {wallet.accounts.join(', ')}</div>
            <h3>Check School Existence</h3>
            <input
              type="text"
              placeholder="School ID"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
            />
            <button onClick={checkSchoolExistence}>Check School Existence</button>
            {schoolDetails && (
            <div>
              <h3>School Details</h3>
              <p>School ID: {schoolDetails[0]}</p>
              <p>School Name: {schoolDetails[1]}</p>
              <p>Director: {schoolDetails[2]}</p>
              {/* Add more details as needed */}
            </div>
          )}

          <div>
            <h3>Add School</h3>
            <input
              type="text"
              placeholder="School ID"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
            />
            <input
              type="text"
              placeholder="School Name"
              value={naziv}
              onChange={(e) => setNaziv(e.target.value)}
            />
            <input
              type="text"
              placeholder="Director"
              value={direktor}
              onChange={(e) => setDirektor(e.target.value)}
            />
            <button onClick={addSchool}>Add School</button>
          </div>

          <div>
            <h3>Delete School</h3>
            <input
              type="text"
              placeholder="School ID"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
            />
            <button onClick={deleteSchool}>Delete School</button>
          </div>

          <div>
            <h3>Set Director</h3>
            <input
              type="text"
              placeholder="School ID"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
            />
            <input
              type="text"
              placeholder="New Director"
              value={direktor}
              onChange={(e) => setDirektor(e.target.value)}
            />
            <button onClick={setDirector}>Set Director</button>
          </div>

          <div>
            <h3>Change Owner</h3>
            <input
              type="text"
              placeholder="New Owner"
              value={noviVlasnik}
              onChange={(e) => setNoviVlasnik(e.target.value)}
            />
            <button onClick={changeOwner}>Change Owner</button>
          </div>

          <div>
            <h3>Add Teacher</h3>
            <input
              type="text"
              placeholder="School ID"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Teacher ID"
              value={profesorId}
              onChange={(e) => setProfesorId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Teacher Name"
              value={ime}
              onChange={(e) => setIme(e.target.value)}
            />
            <button onClick={addTeacher}>Add Teacher</button>
          </div>

          <div>
            <h3>Add Student</h3>
            <input
              type="text"
              placeholder="School ID"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
            />
            <button onClick={addStudent}>Add Student</button>
          </div>

          <div>
            <h3>Add Grade</h3>
            <input
              type="text"
              placeholder="School ID"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
            />
            <button onClick={addGrade}>Add Grade</button>
          </div>

          <div>
            <h3>Add Note</h3>
            <button onClick={addNote}>Add Note</button>
          </div>

          <div>
            <h3>Get School Details by ID</h3>
            <input
              type="text"
              placeholder="School ID"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
            />
            <button onClick={getSchoolById}>Get School Details</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profesor;
