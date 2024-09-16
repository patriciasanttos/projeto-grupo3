import React, { useEffect, useState } from 'react';

import styles from './styles.module.css';
import { Link } from 'react-router-dom';

const menuItems = [
  { title: 'Faça uma doação', description: 'Ajude a manter nosso trabalho', buttonText: 'Doar', url: '/donation' },
  { title: 'Apadrinhe', description: 'Nos ajude a manter os cuidados de um animal', buttonText: 'Apadrinhar', url: '/sponsorship' },
  { title: 'Adote', description: 'Canditate-se para adoção responsável', buttonText: 'Adotar', url: '/adoption' },
  { title: 'Seja um voluntário', description: 'Saiba como você pode nos ajudar', buttonText: 'Quero ajudar', url: '/volunteers' }
]

function Menu({ currentPage }) {
  const [ menu, setMenu ] = useState([menuItems[0], menuItems[1], menuItems[2]]);
  
  useEffect(() => {
    switch(currentPage) {
      case 'adoption':
        setMenu([menuItems[0], menuItems[1], menuItems[3]]);
        break;
      case 'donation':
        setMenu([menuItems[1], menuItems[2], menuItems[3]]);
        break;
      case 'sponsorship':
        setMenu([menuItems[0], menuItems[2], menuItems[3]]);
        break;
      default:
        setMenu([menuItems[0], menuItems[1], menuItems[2]]);
    }
  }, [currentPage]);

  return (
    <section className={styles.menu}>
      <div className={styles.menu_left}>
        <h1>{menu[0].title}</h1>

        <p>{menu[0].description}</p>

        <Link className={styles.menu_btn} to={menu[0].url}>
          <button>{menu[0].buttonText}</button>
        </Link>
      </div>

      <div className={styles.menu_center}>
        <h1>{menu[1].title}</h1>

        <p>{menu[1].description}</p>

        <Link className={styles.menu_btn} to={menu[1].url}>
          <button>{menu[1].buttonText}</button>
        </Link>
      </div>

      <div className={styles.menu_right}>
        <h1>{menu[2].title}</h1>

        <p>{menu[2].description}</p>

        <Link className={styles.menu_btn} to={menu[2].url}>
          <button>{menu[2].buttonText}</button>
        </Link>
      </div>
    </section>
  );
}

export default Menu;