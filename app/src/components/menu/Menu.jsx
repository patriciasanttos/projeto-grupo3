import React, { useEffect, useState } from 'react';

import styles from './styles.module.css';

const menuItems = [
  { title: 'Faça uma doação', description: 'Ajude a manter nosso trabalho', buttonText: 'Doar' },
  { title: 'Apadrinhe', description: 'Canditate-se para adoção responsável', buttonText: 'Apadrinhar' },
  { title: 'Adote', description: 'Ajude a manter nosso trabalho', buttonText: 'Adotar' },
  { title: 'Seja um voluntário', description: 'Saiba como você pode nos ajudar', buttonText: 'Quero ajudar' }
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

        <button className={styles.menu_btn}>{menu[0].buttonText}</button>
      </div>

      <div className={styles.menu_center}>
        <h1>{menu[1].title}</h1>

        <p>{menu[1].description}</p>

        <button className={styles.menu_btn}>{menu[1].buttonText}</button>
      </div>

      <div className={styles.menu_right}>
        <h1>{menu[2].title}</h1>

        <p>{menu[2].description}</p>

        <button className={styles.menu_btn}>{menu[2].buttonText}</button>
      </div>
    </section>
  );
}

export default Menu;