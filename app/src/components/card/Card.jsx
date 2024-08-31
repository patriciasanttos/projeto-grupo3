import React from 'react';
import styles from './styles.module.css';

const Card = ({ image, name, gender, breed, age }) => {
  return (
    <div className={styles.card}> 
      <img src={image} alt={`Foto de ${name}`} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3>{name}</h3>
        <p>{gender}</p>
        <p>{breed}</p>
        <p>{age}</p>
        <button className={styles.cardButton}>Conheça minha história</button>
      </div>
    </div>
  );
};

export default Card;
