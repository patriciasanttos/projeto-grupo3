import React from 'react';
import styles from './styles.module.css';

const FilterSidebar = () => {
  
  return (
    <div className={styles.filterSidebar}>
       <div className={styles.filterGroup}>
        {/*FILTRO ANIMAL*/}
        <label className={styles.title}>Animais</label>
        <div>
          <label>
            <input 
              type="checkbox" 
            />
           Cão
          </label>
          <label>
            <input
              type="checkbox" 
            />
            Gato
          </label>
        </div>
      </div>
      <div className={styles.filterGroup}>
        {/*FILTRO SEXO*/}
        <label className={styles.title}>Sexo</label>
        <div>
          <label>
            <input 
              type="checkbox" 
            />
            Macho
          </label>
          <label>
            <input 
              type="checkbox" 
            />
            Fêmea
          </label>
        </div>
      </div>
      <div className={styles.filterGroup}>
        {/*FILTRO PORTE*/}
        <label className={styles.title}>Porte</label>
        <div>
          <label>
            <input 
              type="checkbox" 
            />
            G (mais de 25kg)
          </label>
          <label>
            <input 
              type="checkbox" 
            />
            M (até de 25kg)
          </label>
          <label>
            <input 
              type="checkbox" 
            />
            P (até de 10kg)
          </label>
        </div>
      </div>
      <div className={styles.filterGroup}>
        {/*FILTRO IDADE*/}
        <label className={styles.title}>Idade</label>
        <div>
          <label>
            <input 
              type="checkbox" 
            />
            Até 10 anos
          </label>
          <label>
            <input 
              type="checkbox" 
            />
            Até 5 anos
          </label>
          <label>
            <input 
              type="checkbox" 
            />
            Mais de 10 anos
          </label>
          <label>
            <input 
              type="checkbox" 
            />
            Menos de 6 meses
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
