import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

import logo from '../../assets/images/logo.svg';
import email from '../../assets/icons/footer/email.svg';
import instagram from "../../assets/icons/footer/instagram.svg";
import youtube from "../../assets/icons/footer/youtube.svg";
import location from "../../assets/icons/footer/location.svg";

function Footer() {
  return (
    <footer className="footer">
      <img src={logo} alt="Logo" className="logo" />

      <div className="footer_content">
        <div className="footer_nav">
          <ul className="footer_menu">
            <li className="footer_list_title">Menu</li>

            <li>
              <Link className="link" to="/aboutus">
                Sobre nós
              </Link>
            </li>
            <li>
              <Link className="link" to="/adoption">
                Adoção
              </Link>
            </li>
            <li>
              <Link className="link" to="/sponsorship">
                Apadrinhamento
              </Link>
            </li>
            <li>
              <Link className="link" to="/contact">
                Contato
              </Link>
            </li>
          </ul>

          <ul className="footer_contact">
            <li className="footer_list_title">Contato</li>

            <li className="footer_contact_link">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://api.whatsapp.com/send?phone=553299655493"
              >
                (32) 9965-5493
              </a>
            </li>
            <li className="footer_contact_link">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://maps.app.goo.gl/yuyLm9Tk9cHC593Q6"
              >
                BR 040 km 787 - São Pedro CEP 36039-080, Juiz de Fora - MG
              </a>
            </li>
          </ul>
        </div>

        <div className="line"></div>

        <ul className="footer_links">
          <li>
            <a target="blank" rel="noreferrer" href="mailto:ongsjpa@gmail.com">
              <img src={email} alt="Email" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/ong_sjpa/"
            >
              <img src={instagram} alt="Instagram" />
            </a>
          </li>
          <li>
            <a target="blank" rel="noreferrer" href="https://www.youtube.com/@SJPAjf">
              <img src={youtube} alt="Youtube" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://maps.app.goo.gl/yuyLm9Tk9cHC593Q6"
            >
              <img src={location} alt="Location" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;