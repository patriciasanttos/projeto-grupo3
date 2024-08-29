import React from 'react';

import NavBar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';

import "./volunteers.css";

// import { Container } from './styles';

function Volunteers() {
  return (
    <div className="page_container">
      <NavBar />

      <section>
        <h3 className="call-title">FAÇA A DIFERENÇA NA VIDA DE UM ANIMAL</h3>
        <h1 className="call-subtitle">SEJA UM VOLUNTÁRIO</h1>
        <p className="call-text call-text-1">
          Voluntariar-se é uma forma incrível de conectar-se com seres que
          possuem um amor puro <br />e incondicional para oferecer. Além disso,
          você estará cercado por uma comunidade de <br />
          pessoas que compartilham o mesmo amor e respeito pelos animais. <br />
        </p>
        <p className='call-text call-text-2'>
          Não é necessário ter experiência anterior, tudo o que pedimos é um
          coração aberto e
          <br />
          vontade de fazer a diferença. Os animais precisam de você, e cada
          gesto de amor conta!
        </p>
      </section>

      <Footer />
    </div>
  );
}

export default Volunteers;