import React, { useEffect, useState } from 'react';

import './Menu.scss';
import { Link } from 'react-router-dom';

const menuItems = [
  { title: 'Faça uma doação', description: 'Sua contribuição faz a diferença. Descubra como doar!', buttonText: 'Doar', url: '/donation' },
  { title: 'Apadrinhe um animal', description: 'Ajude a garantir os cuidados dos animais!', buttonText: 'Apadrinhar', url: '/sponsorship' },
  { title: 'Adote um amigo', description: 'Candidate-se para uma adoção responsável!', buttonText: 'Adotar', url: '/adoption' },
  { title: 'Seja voluntário', description: 'Você pode por a mão na massa. Descubra como você pode nos ajudar!', buttonText: 'Quero ajudar', url: '/volunteers' }
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
    <section className="menu">
      <div className="menu_left">
        <h1>{menu[0].title}</h1>

        <p>{menu[0].description}</p>

        <Link className="menu_btn" to={menu[0].url}>
          <button>{menu[0].buttonText}</button>
        </Link>
      </div>

      <div className="menu_center">
        <h1>{menu[1].title}</h1>

        <p>{menu[1].description}</p>

        <Link className="menu_btn" to={menu[1].url}>
          <button>{menu[1].buttonText}</button>
        </Link>
      </div>

      <div className="menu_right">
        <h1>{menu[2].title}</h1>

        <p>{menu[2].description}</p>

        <Link className="menu_btn" to={menu[2].url}>
          <button>{menu[2].buttonText}</button>
        </Link>
      </div>
    </section>
  );
}

export default Menu;