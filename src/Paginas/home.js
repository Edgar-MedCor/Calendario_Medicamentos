import React from "react";
import Doctores from "./Doctores.png";
import Header from "../Componentes/header";
import Footer from "../Componentes/footer";

const Home = () => {
  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-purple-200 via-purple-300 to-purple-400 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-screen-lg flex flex-col items-center justify-center md:flex-row p-4">
          <img
            src={Doctores}
            alt="Imagen de doctores"
            className="w-full h-60 md:h-72 lg:h-80 xl:h-96 rounded-lg shadow-xl mb-4 md:mr-4"
          />
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center">
            <p className="text-3xl font-extrabold text-purple-800 mb-4">
              ¡MediTime: Tu Compañero de Salud Personal!
            </p>
            <p className="text-lg text-purple-600 mb-6">
              No pierdas la pista de tu bienestar. Programa tus tomas de
              medicamentos con MediTime, tu calendario médico inteligente. Te
              recordará cuando sea el momento exacto para cuidar de ti, para que
              puedas vivir la vida al máximo. ¡Cuida de tu salud con facilidad y
              precisión con MediTime!
            </p>
            <a
              href="/calendario"
              className="bg-purple-800 text-white py-3 px-6 rounded-full inline-block font-semibold hover:bg-purple-700 transition-transform transform hover:scale-105"
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
