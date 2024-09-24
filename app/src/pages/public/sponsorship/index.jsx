import React, { useEffect, useState } from "react";

import "./sponsorship.scss";

import NavBar from "../../../components/navbar/NavBar";
import Footer from "../../../components/footer/Footer";
import Menu from "../../../components/menu/Menu";
import CardAnimal from "../../../components/cardAnimal/CardAnimal";
import ModalLPSponsorship from "../../../components/modal/modalLPSponsorship";
import imageDog1 from "../../../assets/images/dog1.svg";
import ContentHero from "../../../components/contentHero/ContentHero";
import LoadingPaw from "../../../components/loadingPaw";
import { getAllAnimals } from "../../../services/api/animals";
import Pagination from "../../../components/pagination";

// Estamos limitando para que não exiba muitas páginas e quebre
const LIMIT_ITEMS = 100;

function Sponsorship() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginatedAnimals, setPaginatedAnimals] = useState([]);

  useEffect(() => {
    const getAnimals = async () => {
      const data = (await getAllAnimals()).slice(0, LIMIT_ITEMS);
      const animalsWithImage = data.map((animal) => ({
        ...animal,
        image: imageDog1,
      }));

      setLoading(false);
      setAnimals(animalsWithImage);
    };

    getAnimals();
  }, []);

  const onClickCardAnimal = (animal) => {
    setIsModalOpen(true);
    setSelectedAnimal(animal);
  };

  return (
    <div className="page_container">
      <NavBar />

      <ContentHero
        subtitle="Faça a diferença na vida de um animal"
        title="Seja uma madrinha ou padrinho"
        text="Apadrinhar um dos nossos animais é transformar uma vida. Com sua ajuda, eles recebem alimento, abrigo, cuidados e amor. Mesmo à distância, você faz a diferença e acompanha o impacto do seu apoio."
      />

      {loading ? (
        <LoadingPaw />
      ) : (
        <div className="contentContainer">
          <p className="text">Conheça alguns de nossos animais</p>

          <div className="photoGalleryCenter">
            <div className="photoGallery">
              <div className="cardContainer">
                {paginatedAnimals.map((animal) => (
                  <CardAnimal
                    onClickButton={onClickCardAnimal}
                    animal={animal}
                    key={animal.id}
                    image={animal.image}
                    name={
                      animal.name.charAt(0).toUpperCase() +
                      animal.name.slice(1).toLowerCase()
                    }
                    gender={
                      ["m", "M"].includes(animal.gender) ? "Macho" : "Fêmea"
                    }
                    race={
                      animal.race === "srd"
                        ? "Sem raça definida"
                        : `${animal.race.charAt(0).toUpperCase()}${animal.race
                            .slice(1)
                            .toLowerCase()}`
                    }
                    age={animal.age}
                  />
                ))}
              </div>
            </div>
          </div>
          <Pagination
            listItems={animals}
            onPaginate={(items) => setPaginatedAnimals(items)}
          />
        </div>
      )}

      <Menu currentPage="sponsorship" />
      <Footer />
      <ModalLPSponsorship
        isOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
        showForm={true}
        selectedAnimal={selectedAnimal}
      />
    </div>
  );
}

export default Sponsorship;
