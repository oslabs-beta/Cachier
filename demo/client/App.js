import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Demo from './components/Demo';
import Landing from './components/Landing.js';
import Docs from './components/Docs';
import About from './components/About';

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
