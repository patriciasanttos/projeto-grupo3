import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { FiSliders } from "react-icons/fi";

const FilterSidebar = ({ filtersState, setFiltersState }) => {
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
      if (!filtersState[filterType]) 
        return setFiltersState({
          ...filtersState,
          [filterType]: value,
        });

      return setFiltersState({ ...filtersState, [filterType]: `${filtersState[filterType]}/${value}` })
    } 

    const filtersArray = filtersState[filterType].split('/');
    const updatedFilters = filtersArray.filter(item => item !== value);

    return setFiltersState({ ...filtersState, [filterType]: updatedFilters.length > 0 ? updatedFilters.join('/') : '' })
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
            <label><input type="checkbox" name='species' value='canina' onChange={(e) => setFilters(e)} />Cão</label>
            <label><input type="checkbox" name='species' value='gato' onChange={(e) => setFilters(e)} />Gato</label>
          </div>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.title}>Sexo</label>
          <div>
            <label><input type="checkbox" name='gender' value='M' onChange={(e) => setFilters(e)}/>Macho</label>
            <label><input type="checkbox" name='gender' value='F' onChange={(e) => setFilters(e)}/>Fêmea</label>
          </div>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.title}>Porte</label>
          <div>
            <label><input type="checkbox" name='size' value='grande' onChange={(e) => setFilters(e)}/> G (mais de 25kg)</label>
            <label><input type="checkbox" name='size' value='medio' onChange={(e) => setFilters(e)}/> M (até de 25kg)</label>
            <label><input type="checkbox" name='size' value='pequeno' onChange={(e) => setFilters(e)}/> P (até de 10kg)</label>
          </div>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.title}>Idade</label>
          <div>
            <label><input type="checkbox" name='age' value='Filhote' onChange={(e) => setFilters(e)}/> Filhote </label>
            <label><input type="checkbox" name='age' value='Adulto' onChange={(e) => setFilters(e)}/> Adulto </label>
            <label><input type="checkbox" name='age' value='Idoso' onChange={(e) => setFilters(e)}/> Idoso </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
