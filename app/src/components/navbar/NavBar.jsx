import React from 'react';

import logo from '../../assets/images/logo.svg';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className={styles.navbar}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <ul className={styles.navbar_links}>
            <li><Link className={styles.link} to='/'>Início</Link></li>
            <li><Link className={styles.link} to='/aboutus'>Sobre nós</Link></li>
            <li><Link className={styles.link} to='/adoption'>Adoções</Link></li>
            <li><Link className={styles.link} to='/sponsorship'>Apadrinhamento</Link></li>
            <li><Link className={styles.link} to='/volunteers'>Voluntários</Link></li>
            <li><Link className={styles.link} to='/contact'>Contato</Link></li>
        </ul>

        <Link to='/donation'>
            <button className={styles.donate_btn}>
                Doe agora
            </button>
        </Link>
    </nav>
  );
}

export default NavBar;