import React from 'react';

import NavBar from '../../components/navbar/NavBar';
import Menu from '../../components/menu/Menu';
import Footer from '../../components/footer/Footer';

import './donation.css';
import DonationCard from '../../components/card_donation/DonationCard';

// import { Container } from './styles';

function Donation() {
  return (
    <div className='page_container'>
      <NavBar />


      <section className="section-call">
      <h3 className="call-title">FAÇA A DIFERENÇA NA VIDA DE UM ANIMAL</h3>
        <h1 className="call-subtitle"> Faça uma doação </h1>
        <p className="call-text call-text-1"> Nossa ONG se dedica incansavelmente a cuidar desses animais, proporcionando<br /> 
        alimentação, abrigo, cuidados veterinários e, acima de tudo, muito amor. Mas para <br /> 
        continuarmos com esse trabalho, precisamos de você. Sua doação, por menor que seja, <br /> 
        faz uma diferença imensa na vida desses animais.</p>

        <p className="call-text call-text-2"> Junte-se a nós nessa missão. Doe agora e ajude a transformar a vida de um <br />
           animal abandonado. Eles contam com você!</p>
        
      </section>

      <section className="section-information">
          <div className='cards-donation'>

            <DonationCard/>
             
             


          </div>






      </section>


      
    

      <Menu />
      <Footer />
    </div>
  );
}

export default Donation;