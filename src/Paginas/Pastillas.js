import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCalendarPlus, FaEdit, FaTrash } from "react-icons/fa";

function Pastillas() {
  const [pastillas, setPastillas] = useState([]);
  const [selectedPastilla, setSelectedPastilla] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [unidad, setUnidad] = useState("ml");
  const [intervaloHoras, setIntervaloHoras] = useState(8);
  const [forma, setForma] = useState("oral");
  const [comentarios, setComentarios] = useState("");
  const [cantidadDosis, setCantidadDosis] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [addToCalendarSuccess, setAddToCalendarSuccess] = useState(false);
  const [addToCalendarError, setAddToCalendarError] = useState(false);
  const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage

  useEffect(() => {
    const fetchPastillas = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3006/listapastillas?userId=${userId}`
        );
        setPastillas(response.data.listapastillas);
      } catch (error) {
        console.log("Error en la consulta de la API", error);
      }
    };

    fetchPastillas();
  }, [userId]);

  const handleAddToCalendar = (pastilla) => {
    setSelectedPastilla(pastilla);
    setModalIsOpen(true);
    setMessage("");
  };

  const handleEditPastilla = (pastilla) => {
    setSelectedPastilla(pastilla);
    setEditModalIsOpen(true);
    setMessage("");
  };

  const handleDeletePastilla = async (pastillaId) => {
    try {
      await axios.delete(`http://localhost:3006/deletepill/${pastillaId}`);
      const updatedPastillas = pastillas.filter(
        (pastilla) => pastilla.id !== pastillaId
      );
      setPastillas(updatedPastillas);
      setDeleteSuccess(true);
    } catch (error) {
      console.error("Error al eliminar la pastilla", error);
      setDeleteError(true);
    }
  };

  const handleAddToCalendarConfirm = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3006/addpilltocalendar`,
        {
          id_usuario: userId,
          pastilla: {
            nombre: selectedPastilla.nombre,
            dosis: cantidad,
            unidad,
            intervalo: intervaloHoras,
            comentarios,
            cantidad_dosis: cantidadDosis,
          },
        }
      );

      if (response.data.status === "Success") {
        setModalIsOpen(false);
        setSelectedPastilla(null);
        setAddToCalendarSuccess(true);
      } else {
        setAddToCalendarError(true);
      }
    } catch (error) {
      console.error("Error al agregar la pastilla al calendario", error);
      setAddToCalendarError(true);
    }
  };

  const handleEditPastillaConfirm = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3006/editpill/${selectedPastilla.id}`,
        {
          nombre: selectedPastilla.nombre,
          dosis: cantidad,
          unidad,
          intervalo: intervaloHoras,
          comentarios,
          cantidad_dosis: cantidadDosis,
        }
      );

      if (response.data.status === "Success") {
        setEditModalIsOpen(false);
        setSelectedPastilla(null);
        setMessage("Pastilla editada con éxito.");
      } else {
        setMessage("Error al editar la pastilla");
      }
    } catch (error) {
      console.error("Error al editar la pastilla", error);
      setMessage("Error al editar la pastilla");
    }
  };

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Pastillas</h1>
      <Link to={`/Add/${userId}`}>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
          Agregar Pastilla
        </button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pastillas.length > 0 ? (
          pastillas.map((pastilla, index) => (
            <div
              key={pastilla.id}
              className={`rounded shadow-md p-4 ${
                index % 2 === 0 ? "bg-blue-100" : "bg-green-100"
              }`}
            >
              <h2 className="text-lg font-bold mb-2">{pastilla.nombre}</h2>
              <p>
                <strong>Dosis:</strong> {pastilla.dosis} <br />
                <strong>Tipo:</strong> {pastilla.tipo}
              </p>
              <div className="flex mt-4 space-x-2">
                <button
                  className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleAddToCalendar(pastilla)}
                >
                  <FaCalendarPlus className="mr-2" />
                  Agregar al Calendario
                </button>
                <Link to={`/edit/${pastilla.id}`}>
                  <button
                    className="flex items-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => handleEditPastilla(pastilla)}
                  >
                    <FaEdit className="mr-2" />
                    Editar
                  </button>
                </Link>
                <button
                  className="flex items-center bg-red-500 hover.bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleDeletePastilla(pastilla.id)}
                >
                  <FaTrash className="mr-2" />
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay pastillas disponibles.</p>
        )}
      </div>

      {deleteSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-green-500 opacity-75"></div>
          <div className="relative p-8 bg-white w-96 rounded-md shadow-lg">
            <p className="text-green-600 text-lg mb-2">
              La pastilla se eliminó con éxito.
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => setDeleteSuccess(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {addToCalendarSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-green-500 opacity-75"></div>
          <div className="relative p-8 bg-white w-96 rounded-md shadow-lg">
            <p className="text-green-600 text-lg mb-2">
              La pastilla se agregó al calendario con éxito.
            </p>
            <Link to="/calendario">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Ir al Calendario
              </button>
            </Link>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2"
              onClick={() => setAddToCalendarSuccess(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {addToCalendarError && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-red-500 opacity-75"></div>
          <div className="relative p-8 bg-white w-96 rounded-md shadow-lg">
            <p className="text-red-600 text-lg mb-2">
              Error al agregar la pastilla al calendario.
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => setAddToCalendarError(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {selectedPastilla && modalIsOpen && (
        <div className={`fixed inset-0 flex items-center justify-center z-50`}>
          <div className="modal-bg absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="modal relative p-8 bg-white w-96 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {selectedPastilla.nombre}
            </h2>
            <label htmlFor="cantidad">Cantidad de dosis:</label>
            <input
              type="number"
              id="cantidad"
              className="w-full p-2 mb-4"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
            <label htmlFor="unidad">Unidad (ml/mg):</label>
            <select
              id="unidad"
              className="w-full p-2 mb-4"
              value={unidad}
              onChange={(e) => setUnidad(e.target.value)}
            >
              <option value="ml">ml</option>
              <option value="mg">mg</option>
            </select>
            <label htmlFor="intervaloHoras">Cada cuantas horas:</label>
            <input
              type="number"
              id="intervaloHoras"
              className="w-full p-2 mb-4"
              value={intervaloHoras}
              onChange={(e) => setIntervaloHoras(e.target.value)}
            />
            <label htmlFor="forma">Forma de toma:</label>
            <select
              id="forma"
              className="w-full p-2 mb-4"
              value={forma}
              onChange={(e) => setForma(e.target.value)}
            >
              <option value="oral">Oral</option>
              <option value="inyeccion">Inyección</option>
              {/* Agrega más opciones aquí */}
            </select>
            <label htmlFor="comentarios">Comentarios:</label>
            <input
              type="text"
              id="comentarios"
              className="w-full p-2 mb-4"
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
            />
            <label htmlFor="cantidadDosis">Número de veces a tomar:</label>
            <input
              type="number"
              id="cantidadDosis"
              className="w-full p-2 mb-4"
              value={cantidadDosis}
              onChange={(e) => setCantidadDosis(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                onClick={handleAddToCalendarConfirm}
              >
                Confirmar
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => setModalIsOpen(false)}
              >
                Cancelar
              </button>
            </div>
            {message && <p className="mt-4 text-red-600">{message}</p>}
          </div>
        </div>
      )}

      {selectedPastilla && editModalIsOpen && (
        <div className={`fixed inset-0 flex items-center justify-center z-50`}>
          <div className="modal-bg absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="modal relative p-8 bg-white w-96 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {selectedPastilla.nombre}
            </h2>
            <label htmlFor="cantidad">Cantidad de dosis:</label>
            <input
              type="number"
              id="cantidad"
              className="w-full p-2 mb-4"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
            <label htmlFor="unidad">Unidad (ml/mg):</label>
            <select
              id="unidad"
              className="w-full p-2 mb-4"
              value={unidad}
              onChange={(e) => setUnidad(e.target.value)}
            >
              <option value="ml">ml</option>
              <option value="mg">mg</option>
            </select>
            <label htmlFor="intervaloHoras">Cada cuantas horas:</label>
            <input
              type="number"
              id="intervaloHoras"
              className="w-full p-2 mb-4"
              value={intervaloHoras}
              onChange={(e) => setIntervaloHoras(e.target.value)}
            />
            <label htmlFor="forma">Forma de toma:</label>
            <select
              id="forma"
              className="w-full p-2 mb-4"
              value={forma}
              onChange={(e) => setForma(e.target.value)}
            >
              <option value="oral">Oral</option>
              <option value="inyeccion">Inyección</option>
              {/* Agrega más opciones aquí */}
            </select>
            <label htmlFor="comentarios">Comentarios:</label>
            <input
              type="text"
              id="comentarios"
              className="w-full p-2 mb-4"
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
            />
            <label htmlFor="cantidadDosis">Número de dias con el tratamiento:</label>
            <input
              type="number"
              id="cantidadDosis"
              className="w-full p-2 mb-4"
              value={cantidadDosis}
              onChange={(e) => setCantidadDosis(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                onClick={handleEditPastillaConfirm}
              >
                Confirmar
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => setEditModalIsOpen(false)}
              >
                Cancelar
              </button>
            </div>
            {message && <p className="mt-4 text-red-600">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Pastillas;
