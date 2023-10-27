import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validateLogin from '../Componentes/LoginValidation';
import axios from 'axios';

function Login() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0e7f2', // Fondo morado pastel
  };

  const cardStyle = {
    width: '350px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white', // Fondo blanco
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#6a5acd', // Color de texto morado pastel
  };

  const inputStyle = {
    width: '100%',
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    width: '100%',
    marginBottom: '10px',
    textDecoration: 'none',
    backgroundColor: '#6a5acd', // Color de fondo morado pastel
    color: 'white', // Color de texto blanco
    padding: '10px',
    borderRadius: '5px',
  };

  const bottomMessageStyle = {
    marginBottom: '20px',
    textAlign: 'center',
    marginTop: '15px',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '14px',
  };

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateLogin(values);
    setErrors(validationErrors);

    if (!validationErrors.email && !validationErrors.password) {
      axios
        .post('http://localhost:3006/login', values)
        .then((res) => {
          if (res.data === 'Success') {
            navigate('/Home');
          } else {
            alert('Usuario y contraseña incorrectos');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>INICIAR SESION</h2>
        <form action='' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Ingresa tu Email'
              name='email'
              onChange={handleInput}
              style={inputStyle}
            />
            {errors.email && <span style={errorStyle}>{errors.email}</span>}
          </div>
          <div>
            <label htmlFor='password'>Contraseña</label>
            <input
              type='password'
              id='password'
              placeholder='Ingresa tu Contraseña'
              name='password'
              onChange={handleInput}
              style={inputStyle}
            />
            {errors.password && <span style={errorStyle}>{errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-success' style={buttonStyle}>
            Iniciar Sesión
          </button>
        </form>
        <div style={bottomMessageStyle}>
         
          <Link to='/Signup' className='btn btn-outline-primary' style={buttonStyle}>
            Crear Cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
