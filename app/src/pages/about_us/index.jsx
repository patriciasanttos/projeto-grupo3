import React from 'react';

import NavBar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';

// import { Container } from './styles';

function AboutUs() {
  return (
    <div className='page_container'>
      <NavBar />

      <div>
        <h1>Sobre nós</h1>
      </div>

      <Footer />
    </div>
  );
}

export default AboutUs;