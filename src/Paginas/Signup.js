import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
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

  const alertStyle = {
    backgroundColor: '#ff6b6b', // Fondo rojo claro para la alerta
    color: 'white', // Texto blanco para la alerta
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    animation: 'fadeIn 0.5s',
  };

  const errorIconStyle = {
    marginRight: '10px',
    fontSize: '1.5rem',
  };

  const bottomMessageStyle = {
    marginBottom: '20px',
    textAlign: 'center',
    marginTop: '10px'
  };

 
  const [values, setValues] = useState({
    email: '',
    name: '',
    password: '',
  });

  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');

  const [errorMessages, setErrorMessages] = useState({
    email: '',
    name: '',
    password: '',
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrorMessages((prev) => ({ ...prev, [name]: '' }));
  };

  const validateFields = () => {
    let valid = true;
    const newErrorMessages = {};

    if (!values.name) {
      newErrorMessages.name = 'Por favor, ingresa tu Nombre.';
      valid = false;
    }

    if (!values.email) {
      newErrorMessages.email = 'Por favor, ingresa tu Email.';
      valid = false;
    }

    if (!values.password) {
      newErrorMessages.password = 'Por favor, ingresa tu Contraseña.';
      valid = false;
    }

    setErrorMessages(newErrorMessages);

    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    axios.post('http://localhost:3006/signup', values)
      .then((res) => {
        if (res.data === 'Success') {
          navigate('/');
        } else if (res.data === 'EmailExists') {
          setAlertMessage('Ya existe una cuenta asociada a este correo electrónico. Por favor, ingresa un correo diferente.');
        } else {
          setAlertMessage('Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.');
        }
      })
      .catch((err) => {
        setAlertMessage('Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.');
        console.log(err);
      });
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>REGISTRO</h2>

        {alertMessage && (
          <div style={alertStyle}>
            <i className="fas fa-exclamation-circle" style={errorIconStyle}></i>
            <span>{alertMessage}</span>
            <button
              onClick={() => setAlertMessage('')}
              style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}

        <form action='' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='Nombre'>Nombre</label>
            <input
              type='text'
              id='Nombre'
              placeholder='Ingresa tu Nombre'
              name='name'
              value={values.name}
              onChange={handleInput}
              style={inputStyle}
            />
            {errorMessages.name && (
              <p style={{ color: 'red' }}>{errorMessages.name}</p>
            )}
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Ingresa tu Email'
              name='email'
              value={values.email}
              onChange={handleInput}
              style={inputStyle}
            />
            {errorMessages.email && (
              <p style={{ color: 'red' }}>{errorMessages.email}</p>
            )}
          </div>
          <div>
            <label htmlFor='password'>Contraseña</label>
            <input
              type='password'
              id='password'
              placeholder='Ingresa tu Contraseña'
              name='password'
              value={values.password}
              onChange={handleInput}
              style={inputStyle}
            />
            {errorMessages.password && (
              <p style={{ color: 'red' }}>{errorMessages.password}</p>
            )}
          </div>
          <button type='submit' className='btn btn-success' style={buttonStyle}>
            Crear Cuenta
          </button>
        </form>
        <div style={bottomMessageStyle}>
          
          <Link to='/Login' className='btn btn-outline-primary' style={buttonStyle}>
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
