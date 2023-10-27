import React from 'react';
import {
  BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './Paginas/home';
import Login from './Paginas/Login';
import Calendario from './Paginas/calendario';
import Signup from './Paginas/Signup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Calendario" element={<Calendario />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
