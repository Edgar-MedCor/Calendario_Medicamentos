// Logout
import React from "react";
import { useNavigate } from 'react-router-dom';
import { CgLogOut } from "react-icons/cg";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina los datos almacenados
    localStorage.clear();
    // Redirige al usuario a la página de iniciar sesión
    navigate('/');
  }

  return (
    <button onClick={handleLogout} className="bg-stone-500 font-semibold py-2 rounded-md w-40 text-white items-center justify-center flex flex-col">
      Cerrar sesion 
      {/* <CgLogOut style={{fontSize:30}}/> */}
    </button>
  );
}

export default LogoutButton;