import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main'; // Import your components for different pages
import Direktor from './pages/Direktor';
import EDiploma from './pages/EDiploma';
import Info from './pages/Info';
import { MetaMaskProvider } from '@metamask/sdk-react';

const App = () => {


  return (
    <div className="App">
      {/* Define routes using Switch and Route */}
      <Routes>
        <Route  path="/" element={<Main/>} />
 
        <Route  path="/direktor" element={<Direktor/>} />
        <Route  path="/ediploma" element={<EDiploma/>} />
        <Route  path="/info" element={<Info/>} />

      </Routes>
    </div>
  );
};

export default App;
