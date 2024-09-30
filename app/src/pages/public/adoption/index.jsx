import React, { useEffect, useState } from "react";

import "./styles.scss";

import NavBar from "../../../components/navbar/NavBar";
import Footer from "../../../components/footer/Footer";
import ContentHero from "../../../components/contentHero/ContentHero";
import CardAnimal from "../../../components/cardAnimal/CardAnimal";
import imageDog1 from "../../../assets/images/landing_page/dog1.svg";
import FilterSidebar from "../../../components/filterSideBar/FilterSideBar";
import LoadingPaw from "../../../components/loadingPaw";
import ModalLPSponsorship from "../../../components/modal/modalLPSponsorship";
import Menu from "../../../components/menu/Menu";
import { getAllAnimals } from "../../../services/api/animals";
import Pagination from "../../../components/pagination";
import useResponsive from "../../../hooks/useResponsive";

const Adoption = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [paginatedAnimals, setPaginatedAnimals] = useState([]);
  const [filters, setFilters] = useState({
    species: "",
    gender: "",
    age: "",
    size: "",
  });
  const { isMobile } = useResponsive();

  useEffect(() => {
    const getAnimals = async () => {
      const data = await getAllAnimals();

      await data.forEach((animal) => {
        animals.push({
          ...animal,
          name: animal.name.charAt(0).toUpperCase() + animal.name.slice(1).toLowerCase(),
          race: animal.race,
          image: animal.image
            ? `data:image/png;base64,${animal.image}`
            : imageDog1,
        });
      });

      setAnimals(animals);
      setFilteredAnimals(animals);
      return setLoading(false);
    };

    getAnimals();
  }, []);

  const getFilteredAnimals = (items) => {
    const results = items.filter((animal) => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === "") return true;

        if (key === "gender" && String(animal.gender) === String(animal.gender).toLowerCase())
          value = value.toLowerCase();

        if (key === "age" && String(animal.age) === String(animal.age).toLowerCase())
          value = value.toLowerCase();

        if (value.includes("/")) return value.includes(String(animal[key]));

        return String(animal[key]) === String(value);
      });
    });

    return results.length > 0 ? results : [];
  }
  
  useEffect(() => {
    setFilteredAnimals(getFilteredAnimals(animals));
  }, [filters]);

  const onClickCardAnimal = (animal) => {
    setIsModalOpen(true);
    setSelectedAnimal(animal);
  };

  return (
    <div className="page_container">
      <NavBar />

      <ContentHero
        subtitle="Faça a diferença na vida de um animal"
        title="Adote um companheiro"
        text="Adotar um animal é um gesto de amor que transforma vidas: a sua e a deles. Na nossa ONG, cães e gatos esperam por um lar onde possam dar e receber carinho. Cada um traz consigo uma história de superação e o desejo profundo de ser amado. Ao adotar, você não só muda a vida de um animal, mas também abre espaço para que outros possam ser resgatados e cuidados. Faça parte desse ciclo de amor e compaixão."
      />
      {loading ? (
        <LoadingPaw />
      ) : (
        <div className="content-container">
          <div className="photo-gallery">
            {!isMobile && (
              <FilterSidebar
                filtersState={filters}
                setFiltersState={setFilters}
              />
            )}

            <div>
              <p className="text">Conheça alguns de nossos animais</p>

              {isMobile && (
                <FilterSidebar
                  filtersState={filters}
                  setFiltersState={setFilters}
                />
              )}

              <div className="card-container">
                {paginatedAnimals.map((animal, index) => (
                  <CardAnimal
                    onClickButton={onClickCardAnimal}
                    animal={animal}
                    key={index}
                    image={animal.image}
                    name={animal.name}
                    gender={
                      ["m", "M"].includes(animal.gender) ? "Macho" : "Fêmea"
                    }
                    race={animal.race}
                    age={animal.age}
                  />
                ))}
              </div>

              <Pagination
                listItems={filteredAnimals}
                onPaginate={(items) => setPaginatedAnimals(items)}
              />
            </div>
          </div>
        </div>
      )}

      <Menu currentPage="adoption" />
      <Footer />
      <ModalLPSponsorship
        isOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
        showForm={false}
        selectedAnimal={selectedAnimal}
      />
    </div>
  );
};

export default Adoption;
