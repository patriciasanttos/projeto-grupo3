import React from 'react';

import NavBar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';

// import { Container } from './styles';

function Donation() {
  return (
    <div className='page_container'>
      <NavBar />

      <div>
        <h1>Doação</h1>
      </div>

      <Footer />
    </div>
  );
}

export default Donation;