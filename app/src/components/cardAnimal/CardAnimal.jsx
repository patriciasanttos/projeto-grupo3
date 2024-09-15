import styles from './styles.module.css';

const CardAnimal = ({ image, name, gender, race, age, onClickButton }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={`Foto de ${name}`} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3>{name}</h3>
        <p>{gender}</p>
        <p>{race}</p>
        <p>{age}</p>
        <button className={styles.cardButton} onClick={onClickButton}>
          Conheça minha história
        </button>
      </div>
    </div>
  );
};

export default CardAnimal;