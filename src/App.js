import React from 'react';
import {
  BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './Paginas/home';
import Login from './Paginas/Login';
import Calendario from './Paginas/calendario';
import Signup from './Paginas/Signup';
import Add from './Paginas/Add'
import Edit from './Paginas/Edit'
import Pastillas from './Paginas/Pastillas'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Calendario" element={<Calendario />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Add/:id" element={<Add />} />
        <Route path="/Edit/:id" element={<Edit />} />
        <Route path="/Pastillas" element={<Pastillas />} />
      </Routes>
    </Router>
  );
}

export default App;
