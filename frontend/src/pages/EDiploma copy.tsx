import '../App.css';
import { useState, useEffect } from 'react';
import { ethers, JsonRpcProvider } from 'ethers';
import BlockGradeABI from '../../BlockGrade.json';

const EDiploma = () => {
  const initialState = { accounts: [], Certificate: [] };
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('code') || '';  // Dobavljanje ID-a iz URL parametra "code"

  useEffect(() => {
    const connectToBlockchain = async () => {
      const provider = new JsonRpcProvider('https://rpc.tornadoeth.cash/goerli');

      const Certificate = await getCertificates(provider, id);

      // Ažuriraj stanje sa certifikatima
      // Ovaj primjer pretpostavlja da će certifikati biti niz objekata sa svojstvom "name"
      setInitialState({ Certificate });
    };

    connectToBlockchain();
  }, [id]);

  const [state, setInitialState] = useState(initialState);

  const getCertificates = async (provider, id) => {
    try {
      const blockGradeContract = new ethers.Contract('0xf7109ebbe9e8fdaee66a8806c6645cb0bfe31f71', BlockGradeABI.abi, provider);
      const Certificate = await blockGradeContract.dohvatiUvjerenje("0x" +id); // TO HEX + 0x
      console.log(Certificate, "0x" + id);
      return Certificate;
    } catch (error) {
      console.error('Error fetching Certificate:', error.message || error);
      return [];
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h2>Connected to Blockchain</h2>
      </div>
      <div>
        Certificate:
        <ul>
            Ime i PREZIME:
          <li>{state.Certificate[0]}</li>
          Opis:
          <li>{state.Certificate[1]}</li>
          Skola:
          <li>{state.Certificate[2]}</li>
    
          <div>
            Ravnatelj
          {state.Certificate[3] && (
              <ul>
                <li>{state.Certificate[3][0]}</li>
                <li>{state.Certificate[3][1]}</li>
                <li>{state.Certificate[3][2]}</li>
              </ul>
            )}
          </div>
          <div>
            Ocjene
            {(state.Certificate[4] || state.Certificate[5]) && (
              <ul>
                {state.Certificate[4].map((subject, index) => (
                  <li key={index}>
                    {state.Certificate[5] && state.Certificate[5][index] && (
                      <ul>
                        <li>
                          Predmet: {subject}
                        </li>
                        <li>
                        Ocjena: {Number(state.Certificate[5][index])}
                        </li>
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

        </ul>
      </div>
    </div>
  );
};

export default EDiploma;
