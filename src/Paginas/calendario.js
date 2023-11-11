import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoutButton from "../Componentes/LogoutButton";
function Calendario() {
  const [medicinas, setMedicinas] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const userId = 1;

  function calculatePeriod(hour) {
    if (hour >= 6 && hour < 12) {
      return "Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Noon";
    } else if (hour >= 17 && hour < 20) {
      return "Evening";
    } else {
      return "Night";
    }
  }

  useEffect(() => {
    const fetchMedicinas = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(
          `http://localhost:3006/listamedicamentos?userId=${userId}`
        );
        setMedicinas(response.data.listamedicamentos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMedicinas();

    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [userId]);

  const handleDelete = async (medicineId) => {
    try {
      await axios.delete(`http://localhost:3006/deletemedicine/${medicineId}`);
      const updatedMedicinas = medicinas.filter(
        (medicina) => medicina.id !== medicineId
      );
      setMedicinas(updatedMedicinas);
    } catch (error) {
      console.error("Error al eliminar el medicamento", error);
    }
  };

  const handleTakeMedicine = async (medicineId) => {
    try {
      const updatedMedicinas = medicinas.map((medicina) => {
        if (medicina.id === medicineId && medicina.cantidad_dosis > 0) {
          const lastTakenTime = new Date(medicina.nextDoseTime);
          lastTakenTime.setHours(lastTakenTime.getHours() + medicina.intervalo);
          medicina.nextDoseTime = lastTakenTime;
          medicina.cantidad_dosis -= 1;
        }
        return medicina;
      });

      // Ordenar medicamentos por período de toma
      updatedMedicinas.sort((a, b) => {
        const periodA = calculatePeriod(new Date(a.nextDoseTime).getHours());
        const periodB = calculatePeriod(new Date(b.nextDoseTime).getHours());
        return periodA.localeCompare(periodB);
      });

      setMedicinas(updatedMedicinas);
    } catch (error) {
      console.error("Error al tomar el medicamento", error);
    }
  };

  function formatTime(timeString) {
    if (timeString === "No programada") {
      return "No programada";
    }
    const isUserLoggedIn = localStorage.getItem('userId');
    
    const time = new Date(timeString);
    const formattedTime = time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    const period = calculatePeriod(time.getHours());

    return `${formattedTime} (${period})`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200">
      <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
          <LogoutButton /> 
        </div>
        <h1 className="text-2xl font-semibold text-center my-4 text-green-500">
          CUADRO DE MEDICAMENTOS
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <div className="overflow-x-auto">
            <div className="flex justify-end mb-4">
              <Link to="/pastillas">
                <button
                  className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  title="Añadir Nuevo"
                >
                  <FaPlusCircle className="inline-block mr-2" />
                  Add New
                </button>
              </Link>
            </div>
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Periodo de toma
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Medicamento
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Dosis (ml/mg)
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Cada cuantas horas
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Hora de la próxima toma
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Comentarios
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Cantidad de veces a tomar
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {medicinas.map((medicina, index) => (
                  <tr
                    key={medicina.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-white"}
                  >
                    <td className="px-4 md:px-6 py-4 md:py-3 whitespace-nowrap">
                    <div className="absolute mt-7 ml-2"> {calculatePeriod(new Date(medicina.nextDoseTime).getHours())}</div>
                      <div className="bg-rose-200 h-5"/>
                      <div className="bg-rose-300 h-5"/>
                      <div className="bg-rose-200 h-5"/>
                      <div className="bg-rose-300 h-5"/>
                    </td>
                    <td
                      className={`px-2 md:px-6 py-4 md:py-3 whitespace-nowrap ${
                        index % 2 === 0 ? "bg-white" : "bg-white"
                      }`}
                    >
                      <div className="absolute mt-7 ml-7">{medicina.medicamento}</div>
                      <div className=" bg-yellow-300 h-5 "/>
                      <div className=" bg-yellow-200 h-5"/>
                      <div className=" bg-yellow-300 h-5"/>
                      <div className=" bg-yellow-200 h-5"/>
                    </td>
                    <td
                      className={`px-4 md:px-6 py-4 md:py-3 whitespace-nowrap ${
                        index % 2 === 0 ? "bg-white" : "bg-white"
                      }`}
                    >
                      <div className="absolute mt-7 ml-5">{medicina.dosis}</div>
                      <div className=" bg-teal-200 h-5"/>
                      <div className=" bg-teal-100 h-5"/>
                      <div className=" bg-teal-200 h-5"/>
                      <div className=" bg-teal-100 h-5"/>
                      
                    </td>
                    <td
                      className={`px-4 md:px-6 py-4 md:py-3 whitespace-nowrap ${
                        index % 2 === 0 ? "bg-white" : "bg-white"
                      }`}
                    >
                       <div className="absolute mt-7 ml-6">{medicina.intervalo}</div> 
                       <div className=" bg-blue-300 h-5"/>
                      <div className=" bg-blue-200 h-5"/>
                      <div className=" bg-blue-300 h-5"/>
                      <div className=" bg-blue-200 h-5"/>
                    </td>
                    <td
                      className={`px-4 md:px-6 py-4 md:py-3 whitespace-nowrap ${
                        index % 2 === 0 ? "bg-white" : "bg-white"
                      }`}
                    >
                       <div className="absolute mt-7 ml-5">{formatTime(medicina.nextDoseTime)}</div>
                       <div className=" bg-green-300 h-5 "/>
                      <div className=" bg-green-200 h-5"/>
                      <div className=" bg-green-300 h-5"/>
                      <div className=" bg-green-200 h-5"/>
                    </td>
                    <td
                      className={`px-4 md:px-6 py-4 md:py-3 whitespace-nowrap ${
                        index % 2 === 0 ? "bg-white" : "bg-white"
                      }`}
                    >
                     <div className="absolute mt-7 ml-7">{medicina.comentarios}</div> 
                     <div className=' bg-slate-300 h-5 w-40'></div>
                      <div className=' bg-slate-200 h-5'></div>
                      <div className=' bg-slate-300 h-5'></div>
                      <div className=' bg-slate-200 h-5'></div>
                    </td>
                    <td
                      className={`px-4 md:px-6 py-4 md:py-3 whitespace-nowrap ${
                        index % 2 === 0 ? "bg-white" : "bg-white"
                      }`}
                    >
                       <div className="absolute mt-7 ml-12">{medicina.cantidad_dosis}</div>
                       <div className=' bg-orange-200 h-5'></div>
                      <div className=' bg-orange-100 h-5'></div>
                      <div className=' bg-orange-200 h-5'></div>
                      <div className=' bg-orange-100 h-5'></div>
                    </td>
                    <td className="px-4 md:px-6 py-3 whitespace-nowrap space-x-2">
                      {/* <Link to={`/edit/${medicina.id}`}>
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                      </Link> */}
                      {!medicina.hasTaken && medicina.cantidad_dosis > 0 && (
                        <button
                          onClick={() => handleTakeMedicine(medicina.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Tomar"
                        >
                          Tomar
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(medicina.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Eliminar"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendario;
