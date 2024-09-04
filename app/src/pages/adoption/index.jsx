import React, { useEffect, useState } from 'react';

import styles from './styles.module.css';

import NavBar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';
import ContentHero from '../../components/contentHero/ContentHero';
import CardAnimal from '../../components/cardAnimal/CardAnimal';
import imageDog1 from '../../assets/images/dog1.svg';
import FilterSidebar from '../../components/filterSideBar/FilterSideBar';
import Menu from '../../components/menu/Menu';

function Adoption() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const animals = [
    { id: 1, image: imageDog1, name: 'Julia', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '3 anos' },
    { id: 2, image: imageDog1, name: 'Max', gender: 'Macho', breed: 'Sem Raça Definida', age: '2 anos' },
    { id: 3, image: imageDog1, name: 'Bella', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '4 anos' },
    { id: 4, image: imageDog1, name: 'Julia', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '3 anos' },
    { id: 5, image: imageDog1, name: 'Max', gender: 'Macho', breed: 'Sem Raça Definida', age: '2 anos' },
    { id: 6, image: imageDog1, name: 'Bella', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '4 anos' },
    { id: 7, image: imageDog1, name: 'Max', gender: 'Macho', breed: 'Sem Raça Definida', age: '2 anos' },
    { id: 8, image: imageDog1, name: 'Bella', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '4 anos' },
    { id: 9, image: imageDog1, name: 'Bella', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '4 anos' },
    { id: 10, image: imageDog1, name: 'Max', gender: 'Macho', breed: 'Sem Raça Definida', age: '2 anos' },
    { id: 11, image: imageDog1, name: 'Bella', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '4 anos' },
    { id: 12, image: imageDog1, name: 'Bella', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '4 anos' },
  ];

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(6); 
      } else if (window.innerWidth <= 1024) {
        setItemsPerPage(8); 
      } else {
        setItemsPerPage(9); 
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    
    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  const paginate = (items, currentPage, itemsPerPage) => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  };

  const paginatedAnimals = paginate(animals, currentPage, itemsPerPage);
  const totalPages = Math.ceil(animals.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className='page_container'>
      <NavBar />

      <ContentHero
       subtitle="Faça a diferença na vida de um animal" 
       title="Adote um companheiro" 
       text="Adotar um animal é um gesto de amor que transforma vidas, a sua e a deles. Na nossa ONG, cães e gatos esperam por um lar onde possam dar e receber carinho. Cada um carrega uma história de superação e o desejo de ser amado. Ao adotar, você abre espaço para que mais animais possam ser resgatados e amados. Faça parte desse ciclo de amor e compaixão."
        />
      
      <div className={styles.contentContainer}>
        <p className={styles.text}>Conheça alguns de nossos animais</p>
        <div className={styles.photoGallery}>
          <FilterSidebar/>
        
          <div className={styles.cardContainer}>
            {paginatedAnimals.map(animal => (
              <CardAnimal
                key={animal.id}
                image={animal.image}
                name={animal.name}
                gender={animal.gender}
                breed={animal.breed}
                age={animal.age}
              />
            ))}
          </div>
        </div>
        <div className={styles.pagination}>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={styles.arrowButton}
          >
            &laquo; 
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ? styles.active : ''}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={styles.arrowButton}
          >
            &raquo; 
          </button>
        </div>
      </div>
      <Menu currentPage='adoption' />
      <Footer />
    </div>
  );
}

export default Adoption;