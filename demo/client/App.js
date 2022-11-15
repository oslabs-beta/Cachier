import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Demo from './components/Demo';
import Landing from './components/Landing.js';

const App = () => {
  return (
    // <BrowserRouter>
      <Routes>
        <Route path='/' element={<Demo />}></Route>
        <Route path='/landing' element={<Landing />}></Route>
      </Routes>
    // </BrowserRouter>
  );
};

export default App;
