import React from "react";
import Doctores from "./Doctores.png";
import Header from '../Componentes/header'
import Footer from '../Componentes/footer'
const Home = () => {
  return (
    <>
   <Header />
    <div className="bg-purple-100 min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center md:flex-row">
        <img
          src={Doctores}
          alt="Imagen de doctores"
          className="w-full ml-6 sm:w-auto sm:h-64 md:h-96 lg:h-96 xl:h-96"
        />
        <div className="p-4 text-center mt-4">
          <p className="text-4xl font-extrabold text-purple-800 mb-4">
            ¡MediTime: Tu Compañero de Salud Personal!
          </p>
          <p className="text-lg text-purple-600 mb-8">
            No pierdas la pista de tu bienestar. Programa tus tomas de
            medicamentos con MediTime, tu calendario médico inteligente. Te
            recordará cuando sea el momento exacto para cuidar de ti, para que
            puedas vivir la vida al máximo. ¡Cuida de tu salud con facilidad y
            precisión con MediTime!
          </p>
          <a
            href="/calendario"
            className="mt-4 bg-purple-500 text-white py-3 px-6 rounded-full hover:bg-purple-700"
          >
            Ir al calendario
          </a>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Home;
