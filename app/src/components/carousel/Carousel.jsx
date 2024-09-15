import CardAnimal from "../../components/cardAnimal/CardAnimal";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import arrowRight from "../../assets/icons/arrow-right.svg";
import "./Carousel.scss";
import { useState } from "react";

const Carousel = ({ animals, onClickCardAnimal }) => {
  const [initialIndex, setInitialIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(2);
  const isLeftArrowDisabled = initialIndex === 0;
  const isRightArrowDisabled = endIndex === animals.length - 1;

  const showAnimals = [
    animals[initialIndex],
    animals[endIndex - 1],
    animals[endIndex],
  ];

  const onClickLeft = () => {
    if (initialIndex > 0) {
      setInitialIndex(initialIndex - 1);
      setEndIndex(endIndex - 1);
    }
  };

  const onClickRight = () => {
    if (endIndex < animals.length - 1) {
      setInitialIndex(initialIndex + 1);
      setEndIndex(endIndex + 1);
    }
  };

  return (
    <div className="carousel">
      {/* Botao left */}
      <img
        style={{ visibility: isLeftArrowDisabled ? "hidden" : "visible" }}
        onClick={onClickLeft}
        className="arrow-left arrow"
        src={arrowLeft}
        alt=""
      />
      {/* div container cards */}
      <div className="container-cards">
        {showAnimals.map((animal) => (
          <CardAnimal
            key={animal.id}
            image={animal.image}
            name={animal.name.charAt(0).toUpperCase() + animal.name.slice(1).toLowerCase()}
            gender={['m', 'M'].includes(animal.gender)  ? 'Macho': 'Fêmea'}
            race={animal.race === 'srd' ? 'Sem raça definída' : `${animal.race.charAt(0).toUpperCase()}${animal.race.slice(1).toLowerCase()}`}
            age={animal.age}
            onClickButton={() => onClickCardAnimal(animal)}
          />
        ))}
      </div>

      {/* Botao right */}
      <img
        style={{ visibility: isRightArrowDisabled ? "hidden" : "visible" }}
        onClick={onClickRight}
        className="arrow-right arrow"
        src={arrowRight}
        alt=""
      />
    </div>
  );
};

export default Carousel;
