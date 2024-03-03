import React from 'react';
import obiteljSVG from '../assets/obitelj.svg';
import profesorSVG from '../assets/profesor.svg';

const Main = () => {
  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <img src={profesorSVG} alt="Profesor" style={{ width: '150px', height: '550px' }} />
        Ja sam Profesor
        <button style={buttonStyle}>Nastavi</button>
      </div>
      <div style={boxStyle}>
        <img src={obiteljSVG} alt="Obitelj" style={{ width: '200px', height: '550px' }} />
        Ja sam Ucenik
        <button style={buttonStyle}>Nastavi</button>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
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

export default Main;
