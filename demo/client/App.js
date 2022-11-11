import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Demo from './components/Demo';
import Landing from './components/Landing.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Demo />}></Route>
        <Route path='/landing' element={<Landing />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
