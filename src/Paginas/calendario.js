import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Calendario() {
    const [medicinas, setMedicinas] = useState([]);

    useEffect(() => {
        const fetchMedicinas = async () => {
            try {
                const response = await axios.get('http://localhost:3006/listamedicamentos');
                setMedicinas(response.data.listamedicamentos);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMedicinas();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-semibold text-center my-4 text-xltext-green-500 ">CUADRO DE MEDICAMENTOS</h1>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <div className="overflow-x-auto">
                        <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Categoría
                                    </th>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Medicamento
                                    </th>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Dosis
                                    </th>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Tiempo
                                    </th>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Hora de la primera toma
                                    </th>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha
                                    </th>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Comentarios
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicinas.map((medicina, index) => (
                                    <tr
                                        key={medicina.id}
                                        className={index % 2 === 0 ? 'bg-yellow-100' : 'bg-green-100'}
                                    >
                                        <td className="px-4 md:px-6 py-4 md:py-3 whitespace-nowrap">{medicina.categoria}</td>
                                        <td className={`px-4 md:px-6 py-4 md:py-3 whitespace-nowrap ${index % 2 === 0 ? 'bg-yellow-100' : 'bg-green-100'}`}>
                                            {medicina.medicamento}
                                        </td>
                                        <td className={`px-4 md:px-6 py-4 md:py-3 whitespace-nowrap ${index % 2 === 0 ? 'bg-yellow-100' : 'bg-green-100'}`}>
                                            {medicina.dosis}
                                        </td>
                                        <td className={`px-4 md:px-6 py-4 md:py-3 whitespace-nowrap ${index % 2 === 0 ? 'bg-yellow-100' : 'bg-green-100'}`}>
                                            {medicina.tiempo}
                                        </td>
                                        <td className={`px-4 md:px-6 py-4 md:py-3 whitespace-nowrap ${index % 2 === 0 ? 'bg-yellow-100' : 'bg-green-100'}`}>
                                            {medicina.hora}
                                        </td>
                                        <td className={`px-4 md:px-6 py-4 md:py-3 whitespace-nowrap ${index % 2 === 0 ? 'bg-yellow-100' : 'bg-green-100'}`}>
                                            {medicina.fecha}
                                        </td>
                                        <td className={`px-4 md:px-6 py-4 md:py-3 whitespace-nowrap ${index % 2 === 0 ? 'bg-yellow-100' : 'bg-green-100'}`}>
                                            {medicina.comentarios}
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
