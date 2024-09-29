import React from 'react';

import NavBar from '../../../components/navbar/NavBar';
import ContentTitles from '../../../components/contentTitles/ContentTitles';
import Menu from '../../../components/menu/Menu';
import Footer from '../../../components/footer/Footer';

import about_video from "../../../assets/videos/about_us_ong.mp4";
import joao_image from '../../../assets/images/joao.svg'

import './about_us.scss';
import Card from '../../../components/card/Card';

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
          <p className="team-title">CONHEÇA QUEM FAZ ACONTECER</p>
          <h1 className="team-subtitle">Nossa equipe</h1>

          <section className="aboutus-team-cards">
            <div className="aboutus-team-cards-scroll">
              <Card img={joao_image} name="João" role="Adestrador" />
              <Card img={joao_image} name="João" role="Adestrador" />
              <Card img={joao_image} name="João" role="Adestrador" />
              <Card img={joao_image} name="João" role="Adestrador" />
              <Card img={joao_image} name="João" role="Adestrador" />
              <Card img={joao_image} name="João" role="Adestrador" />
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