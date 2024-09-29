import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import "./Styles.scss";

import Modal from "..";
import Button from "../../button";
import { createSponsorshipForm } from "../../../services/api/sponsorships";
import { createAdoptionForm } from "../../../services/api/adoptions";

function ModalLPSponsorship({
  isOpen,
  title,
  onModalClose,
  showForm,
  selectedAnimal,
}) {
  const [formSponsor, setFormSponsor] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [formAdoption, setFormAdoption] = useState({
    tutors_name: "",
    address: "",
    email: "",
    phone: "",
    cpf: "",
  });

  const onClickModalButton = async () => {
    if (showForm) {
      return await createSponsorshipForm({ 
        ...formSponsor, 
        phone: Number(formSponsor.phone.replace(/[()\-\s]/g, "")), 
        animal_id: selectedAnimal.id 
      })
        .then(() => {
          alert("Formulário enviado com sucesso!");
          onModalClose();
          setFormSponsor({
            tutors_name: "",
            email: "",
            phone: "",
          });
        }).catch(error => console.log(error));
    }
    
    await createAdoptionForm({
      ...formAdoption,
      phone: Number(formAdoption.phone.replace(/[()\-\s]/g, "")),
      cpf: Number(formAdoption.cpf.replace(/[-.]/g, '')),
      animal_id: selectedAnimal.id
    })
      .then(() => {
        alert("Formulário enviado com sucesso!");
        onModalClose();
        // setFormAdoption({
        //   tutors_name: "",
        //   address: "",
        //   email: "",
        //   phone: "",
        //   cpf: "",
        // });
      }).catch(error => console.log(error));
  };

  return (
    <Modal isOpen={isOpen} onModalClose={onModalClose} title={title}>
      <>
        <section className="generalData">
          <div className="animal-info">
            <h2 className="animalName">{selectedAnimal?.name}</h2>

            <div className="info">
              <div>
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
              </div>
              <div>
                <p>
                  <strong>Porte</strong>: {selectedAnimal?.size}
                </p>
                <p>
                  <strong>Temperamento</strong>: {selectedAnimal?.temperament}
                </p>
              </div>
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
        {showForm ? (
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
                  name="phone"
                  id=""
                  placeholder="Celular"
                  value={formSponsor.phone}
                  onAccept={(value, maskRef, e) =>
                    setFormSponsor({
                      ...formSponsor,
                      phone: e?.target.value,
                    })
                  }
                  mask={"(00) 00000-0000"}
                />
              </form>
            </div>

            <div className="info-sponsor-adoption">
              <p>
                Manteremos contato para enviar informações sobre o seu afilhado
                de quatro patas
              </p>
            </div>
          </div>
        ) : (
          <div className="containerForm">
            <div className="forms">
              <h2>Preencha o formulário</h2>
              <form>
                <input
                  value={formAdoption.tutors_name}
                  onChange={(e) =>
                    setFormAdoption({ ...formAdoption, tutors_name: e.target.value })
                  }
                  type="text"
                  placeholder="Nome Completo *"
                  required
                />

                <IMaskInput
                  mask={"000.000.000-00"}
                  value={formAdoption.cpf}
                  onAccept={(value) =>
                    setFormAdoption({ ...formAdoption, cpf: value })
                  }
                  placeholder="CPF"
                />

                <input
                  value={formAdoption.address}
                  onChange={(e) =>
                    setFormAdoption({
                      ...formAdoption,
                      address: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Endereço Completo *"
                  required
                />
                <input
                  value={formAdoption.email}
                  onChange={(e) =>
                    setFormAdoption({ ...formAdoption, email: e.target.value })
                  }
                  type="email"
                  placeholder="E-mail *"
                  required
                />
                <IMaskInput
                  mask={"(00) 00000-0000"}
                  value={formAdoption.phone}
                  onAccept={(value) =>
                    setFormAdoption({ ...formAdoption, phone: value })
                  }
                  placeholder="Celular"
                />
              </form>
            </div>

            <div className="info-sponsor-adoption">
              <p>Vamos entrar em contato para informações sobre a adoção</p>
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
