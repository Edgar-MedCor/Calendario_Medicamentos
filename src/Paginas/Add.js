import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';

function Add() {
  const [nombre, setNombre] = useState('');
  const [dosis, setDosis] = useState(0);
  const [tipo, setTipo] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    // Fetch user ID from localStorage
    const userId = localStorage.getItem('userId');
    // Optionally, you can log the user ID to ensure it's retrieved correctly
    console.log('User ID:', userId);
  }, []);

  const handleAddPill = async () => {
    try {
      // Get user ID from localStorage
      const userId = localStorage.getItem('userId');

      const response = await axios.post('http://localhost:3006/addpill', {
        id_usuario: userId,
        nombre,
        dosis,
        tipo,
      });

      if (response.data.status === 'Success') {
        setIsSuccessModalOpen(true);
      } else {
        console.error('Error al agregar pastilla');
      }
    } catch (error) {
      console.error('Error al agregar pastilla', error);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Agregar Pastilla</h1>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium mb-2">Nombre:</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium mb-2">Dosis:</label>
        <input
          type="number"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={dosis}
          onChange={(e) => setDosis(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium mb-2">Tipo:</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
      </div>
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={handleAddPill}
      >
        Agregar Pastilla
      </button>

      {/* Modal de éxito */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-end">
              <button className="text-gray-500 hover:text-gray-700" onClick={closeSuccessModal}>
                <FaTimes />
              </button>
            </div>
            <p className="text-green-600 text-lg mb-2">La pastilla se agregó con éxito.</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => {
                closeSuccessModal();
                window.location.href = '/Pastillas';
              }}
            >
              Ir a la Lista de Pastillas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Add;
