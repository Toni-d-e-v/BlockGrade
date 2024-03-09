import React, { useState, useEffect } from 'react';
import obiteljSVG from '../assets/obitelj.svg';
import profesorSVG from '../assets/profesor.svg';
import { ethers, JsonRpcProvider } from 'ethers';
import BlockGradeABI from '../../BlockGrade.json';
const Main = () => {
  const [code, setCode] = useState('');
  const [latestEvents, setLatestEvents] = useState([]);


  return (

    <div>
    
    <div style={headerStyle}>
        BlockGrade - E-Diploma
    </div>

    <div style={containerStyle}>

      <div style={boxStyle}>
          <img src={obiteljSVG} alt="Obitelj" style={{ width: '200px', height: '550px' }} />
          Zelim vidjeti E-Diplomu
          <input 
            style={{
              
            }}
            type="text" // Assuming it's a text input
            value={code} // Use state or a variable to store the input value
            onChange={(e) => setCode(e.target.value)} // Update the state or variable on input change
            placeholder='ID diplome'
          />
          <button 
            onClick={() => window.location = `/ediploma?code=${code}`} // Pass the code value to the URL
            style={buttonStyle}
          >
            Nastavi
          </button>
        </div>
        <div style={boxStyle}>
        <h2>Kako radi?</h2>
       
      
       
        Sustav koristi prednosti blockchain tehnologije kako bi osigurao  neizmjenjivost izdanih diploma.
 
          <p></p>
        BlockGrade koristi Ethereum blockchain kako bi omogućio visoku razinu transparentnosti. 
        <p className="signature_verify"> 
        Blockchain provjereno! 
        </p>
      </div>
    </div>

    <div style={footerStyle}>
      <div>
      <a href="https://github.com/Toni-d-e-v/BlockGrade">Github </a> 
        BlockGrade - E-diplome - Projekat za sum.ba Code Challenge 2024
      </div>
      <button 
                onClick={
                    () => window.location = "/direktor"
                }
        style={buttonStyle_2}>Direktor Panel</button>
    </div>
    </div>

  );
};

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
  };
  
  const boxStyle = {
    width: '250px',
    height: '300px',
    backgroundColor: '#fff',
    border: '2px solid #3498db',
    borderRadius: '8px',
    margin: '0 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '25px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };
  
  const buttonStyle = {
    marginTop: '10px',
    padding: '8px 16px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  };
  const buttonStyle_2 = {
    padding: '8px 8px',
    margin: '5px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  };
  // Responsive styles
  const mediaQuery = `@media (max-width: 768px) {
    ${boxStyle} {
      width: 80%;
    }
  }`;
  const headerStyle = {

    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '14vh',
    fontSize: '4vh',
    borderRadius: '10px',
    padding: '20px'
  };
  const footerStyle = {

    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '10vh',
    marginBottom: '25px',
    borderRadius: '10px',
    padding: '10px'

  };
export default Main;
