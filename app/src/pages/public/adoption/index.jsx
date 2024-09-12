import React, { useEffect, useState } from 'react';

import './styles.scss';

import NavBar from '../../../components/navbar/NavBar';
import Footer from '../../../components/footer/Footer';
import ContentHero from '../../../components/contentHero/ContentHero';
import CardAnimal from '../../../components/cardAnimal/CardAnimal';
import imageDog1 from '../../../assets/images/dog1.svg';
import FilterSidebar from '../../../components/filterSideBar/FilterSideBar';
import Menu from '../../../components/menu/Menu';

function Adoption() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [ filters, setFilters ] = useState({
    species: '',
    gender: '',
    size: '',
    age: '',
  });

  const animals = [
    { id: 1, image: imageDog1, name: 'Julia', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '3 anos', size: 'p' },
    { id: 2, image: imageDog1, name: 'Max', gender: 'Macho', breed: 'Sem Raça Definida', age: '2 anos', size: 'p' },
    { id: 3, image: imageDog1, name: 'Bella', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '4 anos', size: 'm' },
    { id: 4, image: imageDog1, name: 'Julia', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '3 anos', size: 'g' },
    { id: 5, image: imageDog1, name: 'Max', gender: 'Macho', breed: 'Sem Raça Definida', age: '2 anos', size: 'g' },
    { id: 6, image: imageDog1, name: 'Bella', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '4 anos', size: 'm' },
    { id: 7, image: imageDog1, name: 'Max', gender: 'Macho', breed: 'Sem Raça Definida', age: '2 anos', size: 'p' },
    { id: 8, image: imageDog1, name: 'Bella', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '4 anos', size: 'g' },
    { id: 9, image: imageDog1, name: 'Bella', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '4 anos', size: 'm' },
    { id: 10, image: imageDog1, name: 'Max', gender: 'Macho', breed: 'Sem Raça Definida', age: '2 anos', size: 'g' },
    { id: 11, image: imageDog1, name: 'Bella', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '4 anos', size: 'p' },
    { id: 12, image: imageDog1, name: 'Bella', gender: 'Fêmea', breed: 'Sem Raça Definida', age: '4 anos', size: 'p' },
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
      
      <div className='content-container'>
        <p className='text'>Conheça alguns de nossos animais</p>
        <div className='photo-gallery'>
          <FilterSidebar filters={filters} />
        
          <div className='card-container' onClick={() => console.log(filters)} >
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
        <div className='pagination'>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className='arrow-button'
          >
            &laquo; 
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ?'active': ''}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className='arrow-button'
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