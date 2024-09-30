import "./Carousel.scss";
import { useEffect, useState } from "react";
import { useSwipeable } from 'react-swipeable'

import CardAnimal from "../../components/cardAnimal/CardAnimal";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import arrowRight from "../../assets/icons/arrow-right.svg";

import useResponsive from "../../hooks/useResponsive";

const Carousel = ({ animals, onClickCardAnimal }) => {
  const { isMobile, isTablet } = useResponsive();
  const [initialIndex, setInitialIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(2);
  const isLeftArrowDisabled = initialIndex === 0;
  const isRightArrowDisabled = endIndex === animals.length - 1;

  const getCardQuantity = () => {
    if (isMobile)
      return [animals[initialIndex]]

    if (isTablet)
      return [animals[initialIndex], animals[endIndex - 1]];

    return [animals[initialIndex], animals[endIndex - 1], animals[endIndex]];
  }
  const showAnimals = getCardQuantity()

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

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => onClickRight(),
    onSwipedRight: (eventData) => onClickLeft(),
  });

  return (
    <div className="carousel" {...handlers}>
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
            name={
              animal.name.charAt(0).toUpperCase() +
              animal.name.slice(1).toLowerCase()
            }
            gender={["m", "M"].includes(animal.gender) ? "Macho" : "Fêmea"}
            race={
              animal.race === "srd"
                ? "Sem raça definída"
                : `${animal.race.charAt(0).toUpperCase()}${animal.race
                    .slice(1)
                    .toLowerCase()}`
            }
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
