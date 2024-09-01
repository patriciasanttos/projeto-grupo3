import React from "react";
import { Link } from "react-router-dom";

import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import Carousel from "../../components/carousel/Carousel";

// import styles from './styles.css';
import "./landingPage.scss";

// import images
import heroDog from "../../assets/images/hero-dog.png";
import Waves from '../../assets/images/hero-waves.svg'
import imageDog1 from "../../assets/images/dog1.svg";


function LandingPage() {

    const animals = [
    { id: 1, image: imageDog1, name: 'Julia', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '3 anos' },
    { id: 2, image: imageDog1, name: 'Max', gender: 'Macho', breed: 'Sem Raça Definida', age: '2 anos' },
    { id: 3, image: imageDog1, name: 'Bella', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '4 anos' },
    { id: 4, image: imageDog1, name: 'Billy', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '3 anos' },
    { id: 5, image: imageDog1, name: 'Pipoca', gender: 'Macho', breed: 'Sem Raça Definida', age: '2 anos' },
    { id: 6, image: imageDog1, name: 'Costelinha', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '4 anos' },
    { id: 7, image: imageDog1, name: 'Coragem', gender: 'Macho', breed: 'Sem Raça Definida', age: '2 anos' },
    { id: 8, image: imageDog1, name: 'Snoop', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '4 anos' },
    { id: 9, image: imageDog1, name: 'Scooby Doo', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '4 anos' },
  ];
  return (
    <div className="page_container">
      <NavBar />

      <section className="hero">
        <div className="title-img">
          <div>
            <h1 className="hero-title hero-all-text">
              Há 36 anos cuidando de animais abandonados em Juiz de Fora/MG.
            </h1>
            <p className="hero-text hero-all-text">
              Faça parte dessa missão de amor e esperança!
            </p>
            <Link to="/donation">
              <button className="btn-donation">Doe Agora</button>
            </Link>
          </div>
          <div>
            <img className="hero-dog" src={heroDog} alt="" />
          </div>
        </div>
        <img className="waves" src={Waves} alt="" />
      </section>

      <section className="section-adoption">
        <h3 className="adoption-subtitle">CONHEÇA ALGUNS DE NOSSOS ANIMAIS</h3>
        <h1 className="adoption-title">Adote seu novo companheiro!</h1>
        <Carousel animals={animals} />
        <button className="btn-adoption">Conheça mais animais</button>
      </section>
      <Footer />
    </div>
  );
}

export default LandingPage;
