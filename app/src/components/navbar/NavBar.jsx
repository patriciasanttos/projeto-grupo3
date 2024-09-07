import React, { useState } from 'react';
import logo from '../../assets/images/logo.svg';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from "react-icons/fi";  

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <nav className={styles.navbar}>
        <img src={logo} alt="Logo" className={styles.logo} />

        <ul className={`${styles.navbar_links} ${isOpen ? styles.active : ''}`}>
            <li><Link className={styles.link} to='/'>Início</Link></li>
            <li><Link className={styles.link} to='/aboutus'>Sobre nós</Link></li>
            <li><Link className={styles.link} to='/adoption'>Adoção</Link></li>
            <li><Link className={styles.link} to='/sponsorship'>Apadrinhamento</Link></li>
            <li><Link className={styles.link} to='/volunteers'>Voluntários</Link></li>
            <li><Link className={styles.link} to='/contact'>Contato</Link></li>
        </ul>

        <Link to='/donation'>
            <button className={styles.donate_btn}>
                Doe agora
            </button>
        </Link>

        <div className={styles.hamburger} onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />} 
        </div>
    </nav>
  );
}

export default NavBar;
