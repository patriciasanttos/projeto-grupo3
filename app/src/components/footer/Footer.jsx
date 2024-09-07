import React from 'react';
import { Link } from 'react-router-dom';

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

                    <li><Link className={styles.link} to='/aboutus'>Sobre nós</Link></li>
                    <li><Link className={styles.link} to='/adoption'>Adoção</Link></li>
                    <li><Link className={styles.link} to='/sponsorship'>Apadrinhamento</Link></li>
                    <li><Link className={styles.link} to='/contact'>Contato</Link></li>
                </ul>

                <ul className={styles.footer_contact}>
                    <li className={styles.footer_list_title}>Contato</li>

                    <li className={styles.footer_contact_link}>
                        <a target='_blank' rel="noreferrer" href="https://api.whatsapp.com/send?phone=553299655493">
                            (32) 9965-5493
                        </a>
                    </li>
                    <li className={styles.footer_contact_link}>
                        <a target='_blank' rel="noreferrer" href="https://maps.app.goo.gl/yuyLm9Tk9cHC593Q6">
                            BR 040 km 787 - São Pedro CEP 36039-080, Juiz de Fora - MG
                        </a>
                    </li>
                </ul>
            </div>

            <div className={styles.line}></div>

            <ul className={styles.footer_links}>
                <li>
                    <a target='_blank' rel="noreferrer" href="">
                        <img src={email} alt="Email" />
                    </a>
                </li>
                <li>
                    <a target='_blank' rel="noreferrer" href="https://www.instagram.com/ong_sjpa/">
                        <img src={instagram} alt="Instagram" />
                    </a>
                </li>
                <li>
                    <a target='_blank' rel="noreferrer" href="">
                        <img src={facebook} alt="Facebook" />
                    </a>
                </li>
                <li>
                    <a target='_blank' rel="noreferrer" href="https://maps.app.goo.gl/yuyLm9Tk9cHC593Q6">
                        <img src={location} alt="Location" />
                    </a>
                </li>
            </ul>
        </div>
    </footer>
  );
}

export default Footer;