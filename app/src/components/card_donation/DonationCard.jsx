import React from 'react';

import broom from '../../assets/icons/donation/broom.svg'
import med_kit from "../../assets/icons/donation/med_kit.svg";
import medicine from "../../assets/icons/donation/medicine.svg";

import './DonationCard.scss';

function DonationCard() {
  return (
    <section className="donation_card">
        <div className="card">
            <div class="icon-container">
                <img src={broom} alt="Icone de Limpeza" className="icon_donation"/>
            </div>
            <div> 
                <h2>Kit de Limpeza</h2>

                <h3> R$ 25 </h3>
                <p>Desinfetante a base de amônia quaternária para desinfecção das baias da internação.</p>

                <button>Doe Agora</button> 
            </div>
        </div>

        <div className="card">
            <div class="icon-container">
                <img src={med_kit} alt="kit medico" className="icon_donation" />
            </div>
            <div> 
                <h2>Kit Preventivo <br />de Doenças</h2>

                <h3> R$ 40 </h3>
                <p>Vacina para imunizar cães e gatos.</p>

                <button>Doe Agora</button> 
            </div>
        </div>

        <div className="card">
            <div class="icon-container">
                <img src={medicine} alt="seringa" className="icon_donation" />
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