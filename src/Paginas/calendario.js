import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoutButton from "../Componentes/LogoutButton";
function Calendario() {
  const [medicinas, setMedicinas] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [veces_toma] =useState([]);

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
        const userId = localStorage.getItem("userId");
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
        (medicinas) => medicinas.id !== medicineId
      );
      setMedicinas(updatedMedicinas);
    } catch (error) {
      console.error("Error al eliminar el medicamento", error);
    }
  };
  // calcular horas de toma
  const handleTakeMedicine = async (medicineId) => {
    try {
      const updatedMedicinas = medicinas.map((medicina) => {
        if (medicina.id === medicineId && medicina.dias_de_toma > 0) {
          const lastTakenTime = new Date(medicina.nextDoseTime);
          lastTakenTime.setHours(lastTakenTime.getHours() + medicina.intervalo);
          medicina.nextDoseTime = lastTakenTime;
          medicina.dias_de_toma -= 1;
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
    const isUserLoggedIn = localStorage.getItem("userId");

    const time = new Date(timeString);
    const formattedTime = time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    const period = calculatePeriod(time.getHours());

    const veces_toma = medicinas.dias_de_toma * 24 / medicinas.intervalo;

    return `${formattedTime} (${period})`;
  }
  console.log("Valor de veces_toma:", veces_toma);

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
                {medicinas.map((medicinas, index) => (
                  <tr
                    key={medicinas.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-white"}
                  >
                    <td className="px-4 md:px-6 py-4 md:py-3 whitespace-nowrap">
                      <div className="absolute mt-7 ml-2">
                        {calculatePeriod(new Date(medicinas.nextDoseTime).getHours())}
                      </div>
                      <div className="bg-rose-200 h-5" />
                      <div className="bg-rose-300 h-5" />
                      <div className="bg-rose-200 h-5" />
                      <div className="bg-rose-300 h-5" />
                    </td>
                    <td
                      className={`px-2 md:px-6 py-4 md:py-3 whitespace-nowrap ${
                        index % 2 === 0 ? "bg-white" : "bg-white"
                      }`}
                    >
                      <div className="absolute mt-7 ml-7">{medicinas.medicamento}</div>
                      <div className=" bg-yellow-300 h-5 " />
                      <div className=" bg-yellow-200 h-5" />
                      <div className=" bg-yellow-300 h-5" />
                      <div className=" bg-yellow-200 h-5" />
                    </td>
                    <td
                      className={`px-4 md:px-6 py-4 md:py-3 whitespace-nowrap ${
                        index % 2 === 0 ? "bg-white" : "bg-white"
                      }`}
                    >
                      <div className="absolute mt-7 ml-5">{medicinas.dosis}</div>
                      <div className=" bg-teal-200 h-5" />
                      <div className=" bg-teal-100 h-5" />
                      <div className=" bg-teal-200 h-5" />
                      <div className=" bg-teal-100 h-5" />
                    </td>
                    <td
                      className={`px-4 md:px-6 py-4 md:py-3 whitespace-nowrap ${
                        index % 2 === 0 ? "bg-white" : "bg-white"
                      }`}
                    >
                      <div className="absolute mt-7 ml-6">{medicinas.intervalo}</div>
                      <div className=" bg-blue-300 h-5" />
                      <div className=" bg-blue-200 h-5" />
                      <div className=" bg-blue-300 h-5" />
                      <div className=" bg-blue-200 h-5" />
                    </td>
                    <td
                      className={`px-4 md:px-6 py-4 md:py-3 whitespace-nowrap ${
                        index % 2 === 0 ? "bg-white" : "bg-white"
                      }`}
                    >
                      <div className="absolute mt-7 ml-5">{formatTime(medicinas.nextDoseTime)}</div>
                      <div className=" bg-green-300 h-5 " />
                      <div className=" bg-green-200 h-5" />
                      <div className=" bg-green-300 h-5" />
                      <div className=" bg-green-200 h-5" />
                    </td>
                    <td
                      className={`px-4 md:px-6 py-4 md:py-3 whitespace-nowrap overflow-hidden sm:w-1/5 md:w-1/6 lg:w-1/5 ${
                        index % 2 === 0 ? "bg-white" : "bg-white"
                      }`}
                    >
                      <div className="absolute mt-7 ml-7 w-40 truncate">{medicinas.comentarios}</div>
                      <div className=' bg-slate-300 h-5 '></div>
                      <div className=' bg-slate-200 h-5'></div>
                      <div className=' bg-slate-300 h-5'></div>
                      <div className=' bg-slate-200 h-5'></div>
                    </td>
                    <td
                      className={`px-4 md:px-6 py-4 md:py-3 whitespace-nowrap ${
                        index % 2 === 0 ? "bg-white" : "bg-white"
                      }`}
                    >
                      <div className="absolute mt-7 ml-12">{medicinas.dias_de_toma} {veces_toma}</div>
                      <div className=' bg-orange-200 h-5'></div>
                      <div className=' bg-orange-100 h-5'></div>
                      <div className=' bg-orange-200 h-5'></div>
                      <div className=' bg-orange-100 h-5'></div>
                    </td>
                    <td className="px-4 md:px-6 py-3 whitespace-nowrap space-x-2">
                      {!medicinas.hasTaken && medicinas.dias_de_toma > 0 && (
                        <button
                          onClick={() => handleTakeMedicine(medicinas.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Tomar"
                        >
                          Tomar
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(medicinas.id)}
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
