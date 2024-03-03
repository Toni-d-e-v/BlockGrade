import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main'; // Import your components for different pages

const App = () => {


  return (
    <div className="App">
      {/* Define routes using Switch and Route */}
      <Routes>
        <Route  path="/" element={<Main/>} />

      </Routes>
    </div>
  );
};

export default App;
