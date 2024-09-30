import React from 'react';

import NavBar from '../../../components/navbar/NavBar';
import ContentHero from '../../../components/contentHero/ContentHero';
import Menu from '../../../components/menu/Menu';
import Footer from '../../../components/footer/Footer';

import maps_icon from '../../../assets/icons/contact/maps.svg';
import whatsapp_icon from "../../../assets/icons/volunteers_lp/whatsapp.svg";
import email_icon from "../../../assets/icons/contact/green_email.svg";
import instagram_icon from "../../../assets/icons/contact/green_instagram.svg";
import link_icon from "../../../assets/icons/contact/link.svg";

import './styles.css';
import ContentTitles from '../../../components/contentTitles/ContentTitles';

function Contact() {
  return (
    <div className="page_container">
      <NavBar />

      <div className="contact-page-container">
        <ContentHero
          title="Entre em contato e faça parte dessa causa"
          subtitle="Juntos podemos fazer a diferença!"
          text="Você ama os animais e deseja ajudar a proporcionar uma vida melhor para eles?"
          text2="Nossa ONG está comprometida em cuidar e encontrar lares amorosos para animais abandonados. Precisamos do seu apoio!"
        />

        <main className="contact-page-main">
          <ContentTitles subtitle="Como nos encontrar" title="Fale Conosco"/>
          
          <section className="address">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3705.664113657807!2d-43.446819524338544!3d-21.75454368008266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x989928e47f698d%3A0xe2f61fb1e1d6662c!2sONG%20SJPA!5e0!3m2!1spt-BR!2sbr!4v1724877140399!5m2!1spt-BR!2sbr"
              width="500"
              height="300"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Maps"
            ></iframe>

            <div className="address-text">
              <div>
                <h4>Endereço</h4>

                <img src={maps_icon} alt="Maps" />
              </div>

              <p>
                BR 040, km 787 - São Pedro <br /> <br />
                CEP 36039-080, Juiz de Fora - MG
              </p>
            </div>
          </section>

          <section className="contacts">
            <div className="whatsapp">
              <div className="contacts-title">
                <h4>Whatsapp</h4>

                <img
                  src={whatsapp_icon}
                  alt="Whatsapp"
                  style={{ width: "13%" }}
                />
              </div>

              <div className="whatsapp-link">
                <p>Responsável: Elenir da Silva Silveira</p>
                <a
                  target="_blanck"
                  href="https://api.whatsapp.com/send?phone=553299655493"
                >
                  <div>
                    <img src={link_icon} alt="Link" />
                    <p>+55 (32) 9965-5493</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="email">
              <div className="contacts-title">
                <h4>Email</h4>

                <img src={email_icon} alt="Email" />
              </div>

              <p>ongsjpa@gmail.com</p>
              <p>voluntariabeatriz@ongsjpa.org</p>
            </div>

            <div className="instagram">
              <div className="contacts-title">
                <h4>Instagram</h4>

                <img
                  src={instagram_icon}
                  alt="Instagram"
                  style={{ marginLeft: "5%" }}
                />
              </div>

              <a target="_blanck" href="https://www.instagram.com/ong_sjpa/">
                <img src={link_icon} alt="Link" />
                <p>ong_sjpa</p>
              </a>
            </div>
          </section>

          <section className="questions">
            <h4>Dúvidas Frequentes</h4>

            <details>
              <summary>
                Eu preciso buscar o animal no Instituto ou vocês o trazem até
                minha casa?
              </summary>
              <div>
                <p>
                  Sim , mas normalmente pedimos sempre por um táxi cão
                  solidário.
                </p>
              </div>
            </details>

            <details>
              <summary>Posso adotar mais de um animal?</summary>
              <div>
                <p>Sim, claro.</p>
              </div>
            </details>

            <details>
              <summary>Apenas pessoas de Juiz de Fora podem adotar?</summary>
              <div>
                <p>
                  Não, pode ser de qualquer lugar mas se não puder buscar o
                  animal, deverá custear a ida do animal até o local.
                </p>
              </div>
            </details>

            <details>
              <summary>Como posso ser um patrocinador?</summary>
              <div>
                <p>
                  Patrocinadores fazem doações mensais de um determinado valor
                  ou produtos, exemplo: mil reais para gastar na loja ou 100
                  sacos de rações para filhotes.
                </p>
              </div>
            </details>

            <details>
              <summary>Recebemos ajuda do governo?</summary>
              <div>
                <p>
                  A ong é particular, de tempos em tempos recebemos verbas de
                  vereadores ou do governo, mas nada definitivo e sempre para
                  algo específico (como compra de ração ou castração).
                </p>
              </div>
            </details>
          </section>
        </main>
      </div>

      <Menu />
      <Footer />
    </div>
  );
}

export default Contact;