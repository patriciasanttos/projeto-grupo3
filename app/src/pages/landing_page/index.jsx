import React from "react";

import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

// import styles from './styles.css';
import "./landingPage.scss";

// import images
import heroDog from "../../assets/images/hero-dog.png";
import Waves from '../../assets/images/hero-waves.svg'

function LandingPage() {
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
            <button className="btn-donation">Doe Agora</button>
          </div>
          <div>
            <img className="hero-dog" src={heroDog} alt="" />
          </div>
        </div>
        <img className="waves" src={Waves} alt="" />
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
