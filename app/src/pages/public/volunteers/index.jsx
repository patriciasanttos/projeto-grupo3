import { useState } from "react";
import { IMaskInput } from "react-imask";

import NavBar from "../../../components/navbar/NavBar";
import ContentHero from '../../../components/contentHero/ContentHero';
import Menu from "../../../components/menu/Menu";
import Footer from "../../../components/footer/Footer";
import StateSelect from "./StateSelectComponent/StateSelect";

import "./volunteers.scss";

//Icons
import dog from "../../../assets/icons/dog.svg";
import walkDog from "../../../assets/icons/walk-dog.svg";
import heart from "../../../assets/icons/heart.svg";
import cat from "../../../assets/icons/cat.svg";
import socialMedia from "../../../assets/icons/social-media.svg";
import bath from "../../../assets/icons/bath.svg";
import clothing from "../../../assets/icons/clothing.svg";
import gloves from "../../../assets/icons/gloves.svg";
import food from "../../../assets/icons/food.svg";
import dogHouse from "../../../assets/icons/dog-house.svg";
import attention from "../../../assets/icons/attention.svg";
import volunteers from "../../../assets/icons/volunteers.svg";
import clock from "../../../assets/icons/clock.svg";
import whatsApp from "../../../assets/icons/whatsapp.svg";

// import { Container } from './styles';

function Volunteers() {
  const [selectedOption, setSelectedOption] = useState(null);

  const [formOver18, setFormOver18] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    occupation: "",
    address: "",
    availability: "",
    sector: "",
    state: ""
  })

  const [formUnder18, setFormUnder18] = useState({
    responsibleName: "",
    phoneNumber: "",
    minorsName: "",
    periodStudy: "",
    email: "",
    address: "",
    availability: "",
    sector: "",
    state: ""
  });

  const onClickSubmitOver18 = () => {
    alert(JSON.stringify(formOver18));
  };

  const onClickSubmitUnder18 = () => {
    alert(JSON.stringify(formUnder18))
  }

  return (
    <div className="page_container">
      <NavBar />

      {/* SEÇÃO DO TÍTULO E TEXTO SOBRE SER VOLUNTÁRIO */}
      <ContentHero
           title ="Seja um voluntário" 
           subtitle="Faça a diferença na vida de um animal" 
           text="Voluntariar-se é uma forma incrível de conectar-se com seres que possuem um amor puro e incondicional para oferecer. Além disso,
           você estará cercado por uma comunidade de pessoas que compartilham o mesmo amor e respeito pelos animais."
           text2="Não é necessário ter experiência anterior, tudo o que pedimos é um coração aberto e vontade de fazer a diferença. Os animais precisam de você, e cada gesto de amor conta!"    
      />

      {/* CONTEÚDO PRINCIPAL DA PÁGINA - TAREFAS DO VOLUNTÁRIO */}
      <main className="main-volunteers">
        <h3 className="main-title">FAÇA A DIFERENÇA NA VIDA DE UM ANIMAL</h3>
        <h1 className="main-subtitle">Seja um voluntário</h1>

        {/* O QUE O VOLUNTÁRIO FAZ */}
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

          {/* INSTRUÇÕES PARA O VOLUNTÁRIO  */}
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

          {/* INFORMAÇÕES PARA O VOLUNTÁRIO  */}
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

          {/* FORMULÁRIO PARA SER VOLUNTÁRIO */}
          <h4 className="form-title">Preencha o formulário</h4>
          <div className="align-checkbox">
            <div
              id="over-18"
              className="checkbox-form"
              onClick={() => setSelectedOption("over-18")}
              style={{
                backgroundColor:
                  selectedOption === "over-18" ? "#5BB656" : "white",
              }}
            ></div>
            <p>Sou maior de 18 anos</p>
            <div
              id="under-18"
              className="checkbox-form"
              onClick={() => setSelectedOption("under-18")}
              style={{
                backgroundColor:
                  selectedOption === "under-18" ? "#5BB656" : "white",
              }}
            ></div>
            <p>Sou menor de 18 anos</p>
          </div>
          <section className="text-form">
            {selectedOption === "over-18" && (
              <div>
                <p>
                Pelo presente Termo de Adesão e ciente da Lei n. 9.608/1998 que
                rege o trabalho voluntário,decido espontaneamente realizar
                atividade voluntária nesta organização. <br />Declaro, ainda, que
                estou ciente de que o trabalho não será remunerado e que não
                configurará vínculo empregatício ou gerará qualquer obrigação de
                natureza trabalhista, previdenciária ou afim. <br />Declaro, por fim,
                que estou ciente de que eventuais danos pessoais ou materiais
                causados no exercício do trabalho voluntário serão de total e
                integral responsabilidade minha e não serão imputados à esta
                organização.
              </p>
            
              <form className="volunteers-form" action="">
                <div className="align-form">
                  <input type="text" name="Nome" id="" placeholder="Nome completo" value={formOver18.name} onChange={(e) => setFormOver18({...formOver18, name: e.target.value})}/>
                  <input type="text" name="E-mail" id="" placeholder="E-mail" value={formOver18.email} onChange={(e) => setFormOver18({...formOver18, email: e.target.value})}/>
                  <input type="text" name="Endereço" id="" placeholder="Endereço completo" value={formOver18.address} onChange={(e) => setFormOver18({...formOver18, address: e.target.value})}/>
                  <select defaultValue="" onChange={(e) => setFormOver18({ ...formOver18, sector: e.target.value })}>
                    <option value="" disabled>Setor</option>
                    <option value="Canil">Canil</option>
                    <option value="Gatil">Gatil</option>
                    <option value="Limpeza">Limpeza</option>
                  </select>
                </div>
                <div className="align-form">
                  <IMaskInput type="text" name="Celular" id="" placeholder="Celular" value={formOver18.phoneNumber} onAccept={(value, maskRef, e) => setFormOver18({...formOver18, phoneNumber: e.target.value})} mask={"(00) 00000-0000"}/>
                  <input type="text" name="Profissão" id="" placeholder="Profissão" value={formOver18.occupation} onChange={(e) => setFormOver18({...formOver18, occupation: e.target.value})}/>
                  <input type="number" name="Disponibilidade" id="" placeholder="Disponibilidade de horas na semana" value={formOver18.availability} onChange={(e) => setFormOver18({...formOver18, availability: e.target.value})}/>
                  <StateSelect onChange={(e) => setFormOver18({ ...formOver18, state: e.target.value })}/>
                </div>
              </form>
                <button onClick={onClickSubmitOver18}>Enviar</button>
                </div>
            )}

            {selectedOption === "under-18" && (
              <div>
                <p>
                Pela presente Autorização e ciente da Lei n. 9.608/1998 que rege
                o trabalho voluntário, da Constituição Federal e do Estatuto da
                Criança e do Adolescente que proíbem o trabalho noturno,
                perigoso ou insalubre a menores de dezoito anos, autorizo meu
                filho(a) a realizar atividade voluntária nesta organização.
                <br />Declaro, ainda, que tenho conhecimento e estou de acordo com os
                objetivos e a metodologia usada nas atividades e estou ciente de
                que o projeto tem cunho educacional e social. <br />Declaro, por fim,
                que estou ciente de que o trabalho não será remunerado e que não
                configurará vínculo empregatício ou gerará qualquer obrigação de
                natureza trabalhista, previdenciária ou afim.
                </p>
                <form className="volunteers-form" action="">
                <div className="align-form">
                  <input type="text" name="Nome Responsável" id="" placeholder="Nome do responsável" value={formUnder18.responsibleName} onChange={(e) => setFormUnder18({...formUnder18, responsibleName: e.target.value})}/>
                  <input type="text" name="Nome do menor" id="" placeholder="Nome do menor" value={formUnder18.minorsName} onChange={(e) => setFormUnder18({...formUnder18, minorsName: e.target.value})}/>
                  <input type="text" name="E-mail" id="" placeholder="E-mail" value={formUnder18.email} onChange={(e) => setFormUnder18({...formUnder18, email: e.target.value})}/>
                  <input type="text" name="Endereço" id="" placeholder="Endereço completo" value={formUnder18.address} onChange={(e) => setFormUnder18({...formUnder18, address: e.target.value})}/>
                  <select defaultValue="" onChange={(e) => setFormUnder18({ ...formUnder18, sector: e.target.value })}>
                    <option value="" disabled>Setor</option>
                    <option value="Canil">Canil</option>
                    <option value="Gatil">Gatil</option>
                    <option value="Limpeza">Limpeza</option>
                  </select>
                </div>
                <div className="align-form">
                  <IMaskInput type="text" name="Celular" id="" placeholder="Celular" value={formUnder18.phoneNumber} onAccept={(value, maskRef, e) => setFormUnder18({...formUnder18, phoneNumber: e.target.value})} mask={"(00) 00000-0000"}/>
                  <input type="text" name="Período aula" id="" placeholder="Período que estuda" value={formUnder18.periodStudy} onChange={(e) => setFormUnder18({...formUnder18, periodStudy: e.target.value})}/>
                  <input type="number" name="Disponibilidade" id="" placeholder="Disponibilidade de horas na semana" value={formUnder18.availability} onChange={(e) => setFormUnder18({...formUnder18, availability: e.target.value})}/>
                  <StateSelect onChange={(e) => setFormUnder18({ ...formUnder18, state: e.target.value })}/>
                </div>
              </form>
              <button onClick={onClickSubmitUnder18}>Enviar</button>
              </div>
            )}
          </section>
        </section>
      </main>

      <Menu currentPage='volunteers' />
      <Footer />
    </div>
  );
}

export default Volunteers;
