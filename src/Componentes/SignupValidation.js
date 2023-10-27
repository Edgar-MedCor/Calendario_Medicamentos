const validateSignup = (values) => {
    let errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  
    if (!values.name) {
      errors.name = 'El campo del Nombre es requerido';
    }
  
    if (!values.email) {
      errors.email = 'El campo del email es requerido';
    } else if (!emailPattern.test(values.email)) {
      errors.email = 'Ingresa un email válido';
    }
  
    if (!values.password) {
      errors.password = 'El campo de la contraseña es requerido';
    } else if (!passwordPattern.test(values.password)) {
      errors.password =
        'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número';
    }
  
    return errors;
  };
  
  export default validateSignup;
  