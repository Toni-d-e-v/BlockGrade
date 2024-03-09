import React, { useState, useEffect } from 'react';
import obiteljSVG from '../assets/obitelj.svg';
import profesorSVG from '../assets/profesor.svg';

const Info = () => {



  return (

    <div
    style={{
      backgroundColor: 'white',
      width: '100%'
    }}
    >
    
    <div style={headerStyle}>
        BlockGrade - E-Diploma        <button 
            onClick={() => window.location = `/`} // Pass the code value to the URL
            style={buttonStyle}
          >
            Nazad
          </button>
    </div>
    <div style={containerStyle}>
    <div style={boxStyle}>
        {/* Prvi box */}
        <h2>Transparentnost Blockchaina</h2>
        <p>BlockGrade koristi Ethereum blockchain za visoku transparentnost e-diploma. Svi podaci pohranjuju se na blockchainu, čineći ih dostupnima na Ethereum platformi.</p>
        <p>Neporecivost i Neizmjenjivost: Blockchain osigurava neporecivost i neizmjenjivost izdanih diploma s jedinstvenim identifikatorom.</p>
    </div>
    <div style={boxStyle}>
        {/* Drugi box */}
        <h2>Automatizacija Izdavanja Uvjerenja</h2>
        <p>Pametni ugovori omogućuju brzo i učinkovito izdavanje diploma, smanjujući ručne intervencije.</p>
        <p>Povezanost s Identitetom Ravnatelja: Svako uvjerenje je povezano s identitetom ravnatelja, pridonoseći sigurnosti i povjerenju u ispravnost podataka.</p>
    </div>


<div style={boxStyle}>
    {/* Četvrti box */}
    <h2>Dodatne informacije</h2>
    <p>Ovdje možete dodati dodatne informacije o sustavu BlockGrade.</p>
    <h2>Linkovi</h2>
    {/* Dodajte ovdje dodatne linkove ili informacije */}
    <a href="https://docs.google.com/presentation/d/1lFtP7JAIdi0TmIeXEr87uiyQ4m_X6nZSoZcjwSH7ovM/">Prezentacija</a>
    <a href="https://block-grade.vercel.app/ediploma?code=4891aff173ac1187">Primjer E-diplome</a>
    {/* Dodajte informacije o autorima */}
    <h2>Autori</h2>

    <ul>
        <li><a href="https://github.com/toni-d-e-v">Toni Dumančić</a></li>
        <li><a href="https://github.com/RokoVidovic">Roko Vidović</a></li>
    </ul>
</div>
</div>
    <div style={footerStyle}>
      <div>
      <a href="https://github.com/Toni-d-e-v/BlockGrade">Github </a> 
        BlockGrade - E-diplome - Projekat za sum.ba Code Challenge 2024
      </div>

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
    height: '350px',
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
export default Info;
