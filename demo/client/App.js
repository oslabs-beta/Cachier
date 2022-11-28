import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Demo from './pages/Demo';
import Landing from './pages/Landing.js';
import Docs from './pages/Docs';
import About from './pages/About';

const App = () => {
  return (
    // <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/demo' element={<Demo />}></Route>
        <Route path='/documentation' element={<Docs />}></Route>
        <Route path='/about' element={<About />}></Route>
      </Routes>
    // </BrowserRouter>
  );
};

export default App;
