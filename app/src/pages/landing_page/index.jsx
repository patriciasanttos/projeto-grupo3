import React from 'react';

import NavBar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';

// import styles from './styles.css';

function LandingPage() {
  return (
    <div className='page_container'>
      <NavBar />

      <div>
        <h1>Página inicial</h1>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;