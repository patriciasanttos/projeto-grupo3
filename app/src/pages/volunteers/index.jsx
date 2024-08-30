import React from "react";

import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

import "./volunteers.css";

//Icons
import dog from "../../assets/icons/dog.svg";
import walkDog from "../../assets/icons/walk-dog.svg";
import heart from "../../assets/icons/heart.svg";
import cat from "../../assets/icons/cat.svg";
import socialMedia from "../../assets/icons/social-media.svg";
import bath from "../../assets/icons/bath.svg";
import clothing from "../../assets/icons/clothing.svg";
import gloves from "../../assets/icons/gloves.svg";
import food from "../../assets/icons/food.svg";
import dogHouse from "../../assets/icons/dog-house.svg";
import attention from "../../assets/icons/attention.svg";
import volunteers from "../../assets/icons/volunteers.svg";
import clock from "../../assets/icons/clock.svg";
import whatsApp from "../../assets/icons/whatsapp.svg";

// import { Container } from './styles';

function Volunteers() {
  return (
    <div className="page_container">
      <NavBar />

      <section className="volunteer-phrase">
        <h3 className="section-title">FAÇA A DIFERENÇA NA VIDA DE UM ANIMAL</h3>
        <h1 className="section-subtitle">Seja um voluntário</h1>
        <p className="section-text section-text-1">
          Voluntariar-se é uma forma incrível de conectar-se com seres que
          possuem um amor puro <br />e incondicional para oferecer. Além disso,
          você estará cercado por uma comunidade de <br />
          pessoas que compartilham o mesmo amor e respeito pelos animais. <br />
        </p>
        <p className="section-text section-text-2">
          Não é necessário ter experiência anterior, tudo o que pedimos é um
          coração aberto e
          <br />
          vontade de fazer a diferença. Os animais precisam de você, e cada
          gesto de amor conta!
        </p>
      </section>

      <main>
        <h3 className="main-title">FAÇA A DIFERENÇA NA VIDA DE UM ANIMAL</h3>
        <h1 className="main-subtitle">Seja um voluntário</h1>

        <section className="volunteer-info">
          <h4 className="volunteer-title">O que o voluntário faz</h4>
          <ul className="align-volunteers-info">
            <div className="icon-text">
              <li>
                <img src={dog} alt={"Dog"} />
                Limpeza de Canil
              </li>
              <li>
                <img src={walkDog} alt={"Walk Dog"} />
                Passeio com os cães
              </li>
              <li>
                <img src={heart} alt={"Heart"} />
                Dar carinho
              </li>
            </div>
            <div className="icon-text">
              <li>
                <img src={cat} alt={"Cat"} />
                Limpeza de Gatil
              </li>
              <li>
                <img src={socialMedia} alt={"Social Media"} />
                Divulgação nas Redes Sociais
              </li>
              <li>
                <img src={bath} alt={"Bath"} />
                Dar um banho
              </li>
            </div>
          </ul>

          <h4 className="volunteer-title">Instruções</h4>
          <ul className="align-volunteers-info">
            <div className="icon-text">
              <li>
                <img src={clothing} alt={"Clothing"} />
                Vá com roupas e calçados que possa
                <br />
                molhar/sujar
              </li>
              <li>
                <img src={gloves} alt={"Gloves"} />
                Luvas látex para limpeza
              </li>
              <li>
                <img src={food} alt={"Food"} />
                Levar lanche e garrafinha de água
              </li>
            </div>
            <div className="icon-text">
              <li>
                <img src={dogHouse} alt={"Dog House"} />
                Atenção ao humor do animal, caso ele
                <br />
                não tenha interesse em brincar ou em
                <br />
                carinho, não o incomode
              </li>
              <li>
                <img src={attention} alt={"Attention"} />
                Os trincos dos canis precisam
                <br />
                estar sempre fechados
              </li>
            </div>
          </ul>

          <h4 className="volunteer-title">Informações</h4>
          <ul className="align-volunteers-info">
            <div className="icon-text">
              <li>
                <img src={volunteers} alt={"Volunteers"} />
                Nas primeiras visitas, o ideal é ir com
                <br />
                voluntários antigos para ter orientações
              </li>
              <li>
                <img src={clock} alt={"Clock"} />
                Geralmente vamos no abrigo todos os
                <br />
                dias a partir das 08:00 da manhã
              </li>
              <li>
                <img src={whatsApp} alt={"WhatsApp"} />
                Após preencher o formulário, acesse o
                <br />
                grupo no WhatsApp com os demais
                <br />
                voluntários
              </li>
            </div>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Volunteers;
