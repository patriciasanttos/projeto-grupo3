import React from 'react';

import styles from './styles.module.css';

function Card({ name, img, role }) {
  return (
    <div className={styles.card}>
        <img src={img} alt="Foto" />

        <h2>{name}</h2>

        <p>{role}</p>
    </div>
  );
}

export default Card;