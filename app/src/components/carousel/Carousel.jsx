import CardAnimal from "../../components/cardAnimal/CardAnimal";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import arrowRight from "../../assets/icons/arrow-right.svg";
import "./Carousel.scss";
import { useState } from "react";

const Carousel = ({ animals }) => {
  const [initialIndex, setInitialIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(2);
  const isLeftArrowDisabled = initialIndex === 0
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
            name={animal.name}
            gender={animal.gender}
            breed={animal.breed}
            age={animal.age}
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
