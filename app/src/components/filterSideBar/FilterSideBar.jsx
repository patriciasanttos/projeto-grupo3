import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { FiSliders } from "react-icons/fi";

const FilterSidebar = ({ filters }) => {
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

  const setFilters = (element) => {
    const filterType = element.target.name;
    const value = element.target.value;
    
    if (element.target.checked) {
      if (!filters[filterType]) 
        return filters[filterType] = value;

      return filters[filterType] = `${filters[filterType]}/${value}`;
    } 

    const filtersArray = filters[filterType].split('/');
  
    const updatedFilters = filtersArray.filter(item => item !== value);
  
    return filters[filterType] = updatedFilters.length > 0 ? updatedFilters.join('/') : '';
  }

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
        <FiSliders className={styles.icon} /> Filtros
      </button>
      <div
        ref={sidebarRef}
        className={`${styles.filterSidebar} ${isFilterVisible ? styles.visible : ''}`}
      >
        <div className={styles.filterGroup}>
          <label className={styles.title}>Animais</label>
          <div>
            <label><input type="checkbox" name='species' value='dog' onChange={(e) => setFilters(e)} />Cão</label>
            <label><input type="checkbox" name='species' value='cat' onChange={(e) => setFilters(e)} />Gato</label>
          </div>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.title}>Sexo</label>
          <div>
            <label><input type="checkbox" name='gender' value='m' onChange={(e) => setFilters(e)}/>Macho</label>
            <label><input type="checkbox" name='gender' value='f' onChange={(e) => setFilters(e)}/>Fêmea</label>
          </div>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.title}>Porte</label>
          <div>
            <label><input type="checkbox" name='size' value='g' onChange={(e) => setFilters(e)}/> G (mais de 25kg)</label>
            <label><input type="checkbox" name='size' value='m' onChange={(e) => setFilters(e)}/> M (até de 25kg)</label>
            <label><input type="checkbox" name='size' value='p' onChange={(e) => setFilters(e)}/> P (até de 10kg)</label>
          </div>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.title}>Idade</label>
          <div>
            <label><input type="checkbox" name='age' value='10' onChange={(e) => setFilters(e)}/> Até 10 anos </label>
            <label><input type="checkbox" name='age' value='5' onChange={(e) => setFilters(e)}/> Até 5 anos </label>
            <label><input type="checkbox" name='age' value='10+' onChange={(e) => setFilters(e)}/> Mais de 10 anos </label>
            <label><input type="checkbox" name='age' value='6' onChange={(e) => setFilters(e)}/> Menos de 6 meses </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
