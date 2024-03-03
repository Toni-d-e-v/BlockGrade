import React from 'react';
import obiteljSVG from '../assets/obitelj.svg';
import profesorSVG from '../assets/profesor.svg';

const Main = () => {
  return (
    <div>
    
    <div style={headerStyle}>
        BlockGrade - E-dnevnilk
    </div>

    <div style={containerStyle}>
        
      <div style={boxStyle}>
        <img src={profesorSVG} alt="Profesor" style={{ width: '150px', height: '550px' }} />
        Ja sam Profesor
        <button
        onClick={
            () => window.location = "/profesor"
        }
        style={buttonStyle}>Nastavi</button>
      </div>
      <div style={boxStyle}>
        <img src={obiteljSVG} alt="Obitelj" style={{ width: '200px', height: '550px' }} />
        Ja sam Ucenik
        <button 
                onClick={
                    () => window.location = "/ucenik"
                }
        style={buttonStyle}>Nastavi</button>
      </div>
    </div>
    <div style={footerStyle}>
        <a href="https://github.com/Toni-d-e-v/BlockGrade"> Github </a> 
        BlockGrade - E-dnevnilk - Projekat za sum.ba Code Challenge 2024

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
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };
  
  const buttonStyle = {
    marginTop: '10px',
    padding: '8px 16px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
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
    fontSize: '4vh'
  };
  const footerStyle = {

    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '14vh',
    fontSize: '2.7vh'
  };
export default Main;
