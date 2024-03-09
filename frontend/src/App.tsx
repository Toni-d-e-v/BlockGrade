import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Direktor from './pages/Direktor';
import EDiploma from './pages/EDiploma';
import Info from './pages/Info';
import { MetaMaskProvider } from '@metamask/sdk-react';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data or resources
    const fakeLoading = setTimeout(() => {
      setLoading(false);
    }, 3000); // Change 3000 to the actual loading time

    // Clear the timeout on component unmount
    return () => clearTimeout(fakeLoading);
  }, []);

  return (
    <div className="App">
      {/* Conditionally render the content based on the loading state */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/direktor" element={<Direktor />} />
        <Route
          path="/ediploma"
          element={
            loading ? (
              // You can customize the loading indicator or leave it blank
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <video width="640" height="360" autoPlay controls={false} playbackRate={2.0}>
    <source src="/video.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
            ) : (
              <EDiploma />
            )
          }
        />
        <Route path="/info" element={<Info />} />
      </Routes>
    </div>
  );
};

export default App;
