import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { FaFilter } from 'react-icons/fa';

const FilterSidebar = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const sidebarRef = useRef(null);

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsFilterVisible(false);
    }
  };

  useEffect(() => {
    if (isFilterVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterVisible]);

  return (
    <div className={styles.filterWrapper}>
      {/* Botão para mostrar/ocultar filtros em telas menores */}
      <button className={styles.filterToggle} onClick={toggleFilters}>
        <FaFilter className={styles.icon} /> Filtros
      </button>
      <div
        ref={sidebarRef}
        className={`${styles.filterSidebar} ${isFilterVisible ? styles.visible : ''}`}
      >
        <div className={styles.filterGroup}>
          <label className={styles.title}>Animais</label>
          <div>
            <label><input type="checkbox"/>Cão</label>
            <label><input type="checkbox"/>Gato</label>
          </div>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.title}>Sexo</label>
          <div>
            <label><input type="checkbox"/>Macho</label>
            <label><input type="checkbox"/>Fêmea</label>
          </div>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.title}>Porte</label>
          <div>
            <label><input type="checkbox" /> G (mais de 25kg)</label>
            <label><input type="checkbox"/> M (até de 25kg)</label>
            <label><input type="checkbox"/> P (até de 10kg)</label>
          </div>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.title}>Idade</label>
          <div>
            <label><input type="checkbox"/> Até 10 anos </label>
            <label><input type="checkbox"/> Até 5 anos </label>
            <label><input type="checkbox"/> Mais de 10 anos </label>
            <label><input type="checkbox"/> Menos de 6 meses </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
