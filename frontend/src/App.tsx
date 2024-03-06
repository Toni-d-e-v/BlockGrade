import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main'; // Import your components for different pages
import Profesor from './pages/Profesor';
import Ucenik from './pages/Ucenik';
import { MetaMaskProvider } from '@metamask/sdk-react';

const App = () => {


  return (
    <div className="App">
      {/* Define routes using Switch and Route */}
      <Routes>
              <Route  path="/" element={<Main/>} />
 
        <Route  path="/profesor" element={<Profesor/>} />
        <Route  path="/ucenik" element={<Ucenik/>} />

      </Routes>
    </div>
  );
};

export default App;
