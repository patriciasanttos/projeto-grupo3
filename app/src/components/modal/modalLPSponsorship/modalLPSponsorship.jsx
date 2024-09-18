import React, {useState} from "react";
import { IMaskInput } from "react-imask";
import "./Styles.scss";

import Modal from "../../../components/modal";
import Button from "../../../components/button";


function ModalLPSponsorship({
  isOpen,
  title,
  onModalClose,
  showForm,
  selectedAnimal,
}) {
  const onClickModalButton = () => {
    if (showForm) {
      // To do enviar para o back-end
    } else {
      window.open("https://0lh2dmk5.forms.app/formulario-de-adocao-da-sjpa", "_blank");
    }
  }

  const [formSponsor, setFormSponsor] = useState(
    {
      name: "",
      address: "",
      email: "",
      phoneNumber: "",
    }
  )

  return (
    <Modal isOpen={isOpen} onModalClose={onModalClose} title={title}>
      <>
        <section className="generalData">
          <div className="animal-info">
            <h2 className="animalName">{selectedAnimal?.name}</h2>

            <div className="info">
              <p>
                <strong>Sexo</strong>:{" "}
                {selectedAnimal?.gender.toUpperCase() === "F"
                  ? "Fêmea"
                  : "Macho"}
              </p>
              <p>
                <strong>Idade</strong>: {selectedAnimal?.age ?? "N/A"}
              </p>
              <p>
                <strong>Raça</strong>: {selectedAnimal?.race}
              </p>
              <p>
                <strong>Porte</strong>: {selectedAnimal?.size}
              </p>
              <p>
                <strong>Temperamento</strong>: {selectedAnimal?.temperament}
              </p>
            </div>
          </div>
          <div className="img-modal">
            <img className="animal" src={selectedAnimal?.image} alt="animal" />
          </div>
        </section>

        <div className="history">
          <h3>História</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            minima natus commodi error, ad delectus harum possimus laboriosam
            culpa cumque quo quis, iusto, consectetur voluptate numquam quos
            nemo dolores. Tenetur! Lorem ipsum dolor Accusantium minima natus
            commodi error, ad delectus harum possimus laboriosam culpa cumque
            quo quis, iusto, consectetur voluptate numquam quos nemo dolores.
            Tenetur!
          </p>
        </div>

        {showForm && (
          <div className="containerForm">
            <div className="forms">
              <h2>Preencha o formulário</h2>
              <form action="" method="">
                <input
                  value={formSponsor.name}
                  onChange={(e) =>
                    setFormSponsor({ ...formSponsor, name: e.target.value })
                  }
                  type="text"
                  placeholder="Nome Completo *"
                  aria-label="Nome Completo"
                  required
                />
                <input
                  value={formSponsor.address}
                  onChange={(e) =>
                    setFormSponsor({ ...formSponsor, address: e.target.value })
                  }
                  type="text"
                  placeholder="Endereço Completo *"
                  aria-label="Endereço Completo"
                  required
                />
                <input
                  value={formSponsor.email}
                  onChange={(e) =>
                    setFormSponsor({ ...formSponsor, email: e.target.value })
                  }
                  type="email"
                  placeholder="E-mail *"
                  aria-label="E-mail"
                  required
                />
                <IMaskInput
                  type="text"
                  name="phoneNumber"
                  id=""
                  placeholder="Celular"
                  value={formSponsor.phoneNumber}
                  onAccept={(value, maskRef, e) =>
                    setFormSponsor({
                      ...formSponsor,
                      phoneNumber: e.target.value,
                    })
                  }
                  mask={"(00) 00000-0000"}
                />
              </form>
            </div>

            <div className="info-sponsor">
              <p>
                Manteremos contato para enviar informações sobre o seu afilhado
                de quatro patas
              </p>
            </div>
          </div>
        )}

        <div className="btnSubmit">
          <Button type="submit" onClick={onClickModalButton}>
            {showForm ? "Quero apadrinhar" : "Quero adotar"}
          </Button>
        </div>
      </>
    </Modal>
  );
}

export default ModalLPSponsorship;
