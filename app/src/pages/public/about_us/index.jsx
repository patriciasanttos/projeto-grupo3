import React from 'react';

import NavBar from '../../../components/navbar/NavBar';
import ContentTitles from '../../../components/contentTitles/ContentTitles';
import Menu from '../../../components/menu/Menu';
import Footer from '../../../components/footer/Footer';

import video_image from '../../../assets/images/video_image.svg'
import joao_image from '../../../assets/images/joao.svg'

import './styles.css';
import Card from '../../../components/card/Card';

function AboutUs() {
  return (
    <div className='page-container'>
      <NavBar />

      <div className='aboutus-container'>
        <main className='aboutus-main'>
          <ContentTitles
            title = "ONG SJPA"
            subtitle = "Conheça a nossa história"
          />

          <div className='aboutus-main-text'>
            <img className='presentation-video' src={video_image} alt="Vídeo" />

            <p className='text'>Há mais de 36 anos, a SJPA surgiu para salvar animais que seriam sacrificados, oferecendo a eles segurança, cuidado e amor. Nosso abrigo se tornou um lar para centenas de cães e gatos abandonados, onde podem se recuperar e encontrar dignidade.
            Hoje, cuidamos de cerca de 450 animais, todos com histórias marcadas por dor, mas também por esperança. Sem apoio governamental, contamos com a generosidade de pessoas como você para continuar nossa missão.</p>
          </div>
        </main>

        <section className='aboutus-section-team'>
          <p className='title'>CONHEÇA QUEM FAZ ACONTECER</p>
          <h1 className='subtitle'>Nossa equipe</h1>

          <div className='aboutus-team-cards'>
            
            <Card img={joao_image} name='João' role='Adestrador' />
            <Card img={joao_image} name='João' role='Adestrador' />
            <Card img={joao_image} name='João' role='Adestrador' />

            <Card img={joao_image} name='João' role='Adestrador' />
            <Card img={joao_image} name='João' role='Adestrador' />
            <Card img={joao_image} name='João' role='Adestrador' />
          </div>
        </section>
      </div>

      <Menu />
      <Footer />
    </div>
  );
}

export default AboutUs;