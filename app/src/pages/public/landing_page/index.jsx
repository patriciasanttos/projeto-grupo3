import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NavBar from "../../../components/navbar/NavBar";
import Footer from "../../../components/footer/Footer";
import Carousel from "../../../components/carousel/Carousel";
import DonationCard from "../../../components/card_donation/DonationCard";
import ModalLPSponsorship from "../../../components/modal/modalLPSponsorship";
// import styles from './styles.css';
import "./landingPage.scss";
// import { animals } from './animals';

// import images
import partnerImg from "../../../assets/images/partner-img.svg";
import sponsorImg from "../../../assets/images/sponsor-img.svg";
import volunteerImg from "../../../assets/images/volunteer-img.svg";
import imageDog1 from "../../../assets/images/dog1.svg";

// import icons
import dog from "../../../assets/icons/dog.svg";
import walkDog from "../../../assets/icons/walk-dog.svg";
import heart from "../../../assets/icons/heart.svg";
import cat from "../../../assets/icons/cat.svg";
import socialMedia from "../../../assets/icons/social-media.svg";
import bath from "../../../assets/icons/bath.svg";
import { getAllAnimals } from "../../../services/api/animals";

function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ animals ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  const onClickCardAnimal = (animal) => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getAllAnimals()
      .then(async data => {
        await data.forEach(animal => {
          return animals.push({ ...animal, image: imageDog1 })
        });
        setLoading(false);
    });
  }, []);

  if (loading)
    return <div className="loading">Loading...</div>;

  return (
    <div className="page_container landing-page">
      <NavBar />

      <section className="hero">
        <div className="hero-all-text">
          <h1 className="hero-title">
            Há 36 anos cuidando de
            <br />
            animais abandonados
            <br />
            em Juiz de Fora/MG.
          </h1>
          <p className="hero-text">
            Faça parte dessa missão de amor e esperança!
          </p>
          <div className="btn-donation">
            <Link to="/donation">
              <button className="btn">Doe Agora</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-adoption">
        <h3 className="subtitle adoption-subtitle">
          CONHEÇA ALGUNS DE NOSSOS ANIMAIS
        </h3>
        <h1 className="title adoption-title">Adote seu novo companheiro!</h1>
        <Carousel animals={animals} onClickCardAnimal={onClickCardAnimal} />
        <div className="align-btn margin-btn">
          <Link to="/adoption">
            <button className="btn-adoption btn">Conheça mais animais</button>
          </Link>
        </div>
      </section>

      <section className="partner">
        <h3 className="subtitle partner-subtitle">JUNTE-SE A NÓS</h3>
        <h1 className=" title partner-title">Seja um parceiro</h1>
        <div className="align-partner-cards">
          <img src={partnerImg} alt="" />
          <img src={partnerImg} alt="" />
          <img src={partnerImg} alt="" />
          <img src={partnerImg} alt="" />
        </div>
        <div className="align-btn margin-top-btn">
          <a
            href="https://api.whatsapp.com/send?phone=553299655493"
            target="blank"
          >
            <button className="btn-partner btn">Quero ser parceiro</button>
          </a>
        </div>
      </section>

      <section className="sponsor-volunteer">
        <section className="sponsor-section">
          <div>
            <h3 className="sponsor-subtitle subtitle">
              COM DOAÇÕES VOCÊ PODE APOIAR UM ANIMAL
            </h3>
            <h1 className="sponsor-title title">Apadrinhe</h1>
            <p className="sponsor-text">
              O padrinho ajuda no bem estar e no
              <br />
              cuidado do animal. Você pode se sentir
              <br />a vontade para visitá-lo quando quiser.
              <br />
              Contribua mensalmente!
            </p>
            <Link to="/sponsorship">
              <button className="btn-sponsor btn">Quero apadrinhar</button>
            </Link>
          </div>
          <div>
            <img src={sponsorImg} alt="" />
          </div>
        </section>

        <section className="volunteer-section">
          <div>
            <img src={volunteerImg} alt="" />
          </div>
          <div>
            <h3 className="volunteer-subtitle subtitle">JUNTE-SE A NÓS</h3>
            <h1 className="volunteer-title title">Seja um voluntário</h1>
            <div className="icon-container">
              <div className="icon-column">
                <div className="icon-text">
                  <img src={dog} alt={"Dog"} />
                  <label>Limpeza de Canil</label>
                </div>
                <div className="icon-text">
                  <img src={walkDog} alt={"Walk Dog"} />
                  <label>Passeio com os cães</label>
                </div>
                <div className="icon-text">
                  <img src={heart} alt={"Heart"} />
                  <label>Dar carinho</label>
                </div>
              </div>
              <div className="icon-column">
                <div className="icon-text">
                  <img src={cat} alt={"Cat"} />
                  <label>Limpeza de Gatil</label>
                </div>
                <div className="icon-text">
                  <img src={socialMedia} alt={"Social Media"} />
                  <label>Divulgação nas Redes Sociais</label>
                </div>
                <div className="icon-text">
                  <img src={bath} alt={"Bath"} />
                  <label>Dar um banho</label>
                </div>
              </div>
            </div>
            <Link to="/volunteers">
              <button className="btn-volunteer btn">
                Quero ser voluntário
              </button>
            </Link>
          </div>
        </section>
      </section>

      <section className="donation-section">
        <h3 className="donation-subtitle">APOIE A NOSSA CAUSA</h3>
        <h1 className="donation-title">Faça uma doação</h1>
        <DonationCard />
        <div className="align-btn margin-btn">
          <Link to="/donation">
            <button className="btn-donation-lp btn">
              Outras formas de doar
            </button>
          </Link>
        </div>
      </section>
      <Footer />
      <ModalLPSponsorship
        title="Titulo da tela principal"
        isOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
      >
        teste
      </ModalLPSponsorship>
    </div>
  );
}

export default LandingPage;
