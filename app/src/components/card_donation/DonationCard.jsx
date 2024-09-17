import React from 'react';

import styles from './styles.module.css';

import broom from '../../assets/icons/broom.svg'
import med_kit from '../../assets/icons/med_kit.svg'
import medicine from '../../assets/icons/medicine.svg'


function DonationCard() {
  return (
    <section className={styles.donation_card}>
        <div className={styles.card}>
            <div class="icon-container">
                <img src={broom} alt="Icone de Limpeza" className={styles.icon_donation}/>
            </div>
            <div> 
                <h2>Kit de Limpeza</h2>
                <h3> R$ 25 </h3>
                <p>Desinfetante a base de amônia quaternária para desinfecção das baias da internação.</p>
                <button>Doe Agora</button> 
            </div>
        </div>
        <div className={styles.card}>
        <div class="icon-container">
            <img src={med_kit} alt="kit medico" className={styles.icon_donation} />
       </div>
            <div> 
                <h2>Kit Preventivo <br />de Doenças</h2>
                <h3> R$ 40 </h3>
                <p>Vacina para imunizar cães e gatos.</p>
                <button>Doe Agora</button> 
            </div>
        </div>
        <div className={styles.card}>
        <div class="icon-container">
            <img src={medicine} alt="seringa" className={styles.icon_donation} />
         </div>
            <div> 
                <h2>Kit Diária <br />de Internação</h2>
                <h3> R$ 100 </h3>
                <p>Soro, cateter para acesso, equipo esparadrapo e medicação.</p>
                <button>Doe Agora</button> 
            </div>
        </div>
    </section>
  );
}

export default DonationCard;