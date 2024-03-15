import './Diploma.css';
import { useState, useEffect } from 'react';
import { ethers, JsonRpcProvider } from 'ethers';
import BlockGradeABI from '../../BlockGrade.json';

const EDiploma = () => {
  const initialState = { accounts: [], Certificate: [] };
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('code') || '';

  useEffect(() => {
    const connectToBlockchain = async () => {

      const provider = new JsonRpcProvider('https://rpc.tornadoeth.cash/goerli');
      const Certificate = await getCertificates(provider, id);
      setInitialState({ Certificate });

    };

    connectToBlockchain();
  }, [id]);

  const [state, setInitialState] = useState(initialState);

  const getCertificates = async (provider, id) => {
    try {
      const blockGradeContract = new ethers.Contract(
        '0xf7109ebbe9e8fdaee66a8806c6645cb0bfe31f71',
        BlockGradeABI.abi,
        provider
      );
      const Certificate = await blockGradeContract.dohvatiUvjerenje('0x' + id);
      console.log(Certificate, '0x' + id);
      return Certificate;
    } catch (error) {
      console.error('Error fetching Certificate:', error.message || error);
      window.location = '/'

      return [];
    }
  };

  return (
    <div
    style={{
      paddingTop: '2vh'
    }}
    >
    <div className="box">
      <div className="header_diploma">
        <h3>Blockgrade E-diploma</h3>
      
      </div>
      <div>
 
        <ul>
        <div className="center-part">
          <div className="name-section">
              <h4>Ime i Prezime:</h4>
              <p>{state.Certificate[0]}</p>
          </div>
          <div className="description-section">
              <h4>Opis:</h4>
              <p>{state.Certificate[1]}</p>
          </div>
          <div className="school-section">
              <h4>Škola:</h4>
              <p>{state.Certificate[2]}</p>
          </div>
      </div>


          <div >
            {(state.Certificate[4] || state.Certificate[5]) && (
              <table className='tabledip'>
                <thead>
                  <tr>
                    <th>Predmet</th>
                    <th>Ocjena</th>
                  </tr>
                </thead>
                <tbody>
                  {state.Certificate[4].map((subject, index) => (
                    <tr key={index}>
                      {state.Certificate[5] && state.Certificate[5][index] && (
                        <>
                          <td>{subject}</td>
                          <td>{Number(state.Certificate[5][index])}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div>
            
          <div className="ravnatelj">
      {state.Certificate[3] && (
        <div className="ravnatelj-container">
          <div className="button-container">
            <button className='button-17'>printaj</button>
          </div>
          <div>
            <p>
              <p className="signature">{state.Certificate[3][0]}</p>
            </p>
            <p className="blockchain-link">
              <a href={`https://goerli.etherscan.io/address/${state.Certificate[3][2]}`} target="_blank" rel="noopener noreferrer">
                Blockchain adresa 🌐⛓️
              </a>
            </p>
          </div>
        </div>
      )}
    </div>

      
            </div>

        </ul>
        
      </div>
      
    </div>
    <div className='verify'>
    <p className="signature_verify"> 
    Blockchain provjereno! 
    </p>

    </div>
    </div>
  );
};

export default EDiploma;
