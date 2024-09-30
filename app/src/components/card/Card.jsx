import React from 'react';

import './Card.scss';

function Card({ name, img, role }) {
  return (
    <div className="card">
        <img src={img} alt="Foto" />

        <h2>{name}</h2>

        <p>{role}</p>
    </div>
  );
}

export default Card;