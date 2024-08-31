import React from 'react';

import styles from './styles.module.css';

import NavBar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';
import ContentHero from '../../components/contentHero/ContentHero';
import Card from '../../components/card/Card';
import imageDog1 from '../../assets/images/dog1.svg';
import FilterSidebar from '../../components/filterSideBar/FilterSideBar';

function Adoption() {
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
  ];

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
            {animals.map(animal => (
              <Card
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
      </div>
      <Footer />
    </div>
  );
}

export default Adoption;