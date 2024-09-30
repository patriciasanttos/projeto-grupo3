import React from 'react';

import NavBar from '../../../components/navbar/NavBar';
import ContentTitles from '../../../components/contentTitles/ContentTitles';
import Menu from '../../../components/menu/Menu';
import Footer from '../../../components/footer/Footer';

import about_video from "../../../assets/videos/about_us_ong.mp4";
import Beatriz from '../../../assets/images/joao.svg'
import Elenir from '../../../assets/images/volunteers/Elenir.jpg';
import Elisa from '../../../assets/images/volunteers/Elisa.jpg';
import LucasPatricio from '../../../assets/images/volunteers/lucas&patricio.jpg';

import './about_us.scss';
import Card from '../../../components/card/Card';
import ContentTitle from '../../../components/contentTitles/ContentTitles';

function AboutUs() {
  return (
    <div className="page-container">
      <NavBar />

      <div className="aboutus-container">
        <main className="aboutus-main">
          <ContentTitles title="ONG SJPA" subtitle="Conheça a nossa história" />

          <div className="aboutus-main-text">
            <video
              className="presentation-video"
              src={about_video}
              controls
              type="video/mp4"
              alt="Vídeo"
            />

            <p className="text-about">
              Há mais de 36 anos, a SJPA surgiu com a missão de salvar animais
              que seriam sacrificados, oferecendo a eles segurança, cuidado e
              amor. Nosso abrigo se transformou em um lar para centenas de cães
              e gatos abandonados, onde eles podem se recuperar e encontrar
              dignidade.
              <br />
              Hoje, cuidamos de cerca de 450 animais, todos com histórias
              marcadas pela dor, mas também pela esperança. Sem apoio
              governamental, dependemos da generosidade de pessoas como você
              para continuar nossa missão.
            </p>
          </div>
        </main>

        <section className="aboutus-section-team">
          <ContentTitle subtitle="Conheça quem faz acontecer" title="Nossa equipe"></ContentTitle>
 
          <section className="aboutus-team-cards">
            <div className="aboutus-team-cards-scroll">
              <Card img={Beatriz} name="Beatriz" role="Cuidadora" />
              <Card img={Elenir} name="Elenir" role="Cuidadora" />
              <Card img={Elisa} name="Elisa" role="Cuidadora" />
              <Card img={LucasPatricio} name="Lucas" role="Cuidador" />
            </div>
          </section>
        </section>
      </div>

      <Menu />
      <Footer />
    </div>
  );
}

export default AboutUs;