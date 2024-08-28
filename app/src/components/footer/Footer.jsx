import React from 'react';

import styles from './styles.module.css';

import logo from '../../assets/images/logo.svg';
import email from '../../assets/icons/email.svg';
import instagram from '../../assets/icons/instagram.svg';
import facebook from '../../assets/icons/facebook.svg';
import location from '../../assets/icons/location.svg';

function Footer() {
  return (
    <footer className={styles.footer}>
        <img src={logo} alt="Logo" className={styles.logo} />

        <div className={styles.footer_content}>
            <div className={styles.footer_nav}>
                <ul className={styles.footer_menu}>
                    <li className={styles.footer_list_title}>Menu</li>

                    <li>Sobre nós</li>
                    <li>Adoção</li>
                    <li>Apadrinhamento</li>
                    <li>Contato</li>
                </ul>

                <ul className={styles.footer_contact}>
                    <li className={styles.footer_list_title}>Contato</li>

                    <li>(32) 9965-5493</li>
                    <li>
                        BR 040 km 787 - São Pedro <br />
                        CEP 36039-080 <br />
                        Juiz de Fora - MG
                    </li>
                </ul>
            </div>

            <div className={styles.line}></div>

            <ul className={styles.footer_links}>
                <li><img src={email} alt="Email" /></li>
                <li><img src={instagram} alt="Instagram" /></li>
                <li><img src={facebook} alt="Facebook" /></li>
                <li><img src={location} alt="Location" /></li>
            </ul>
        </div>
    </footer>
  );
}

export default Footer;