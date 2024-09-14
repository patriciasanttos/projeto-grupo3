import { useEffect, useState } from "react";
import Modal from "../index";
import { IMaskInput } from "react-imask";
import ModalActionsEnum from '../../../utils/ModalActionsEnum'
import ModalDeleteConfirm from "../modalDeleteConfirm/ModalDeleteConfirm";

const ModalSponsorshipsAdmin = ({
  isOpen,
  modalAction,
  onModalClose,
  selectedSponsor,
  updateSponsorsList,
  createSponsorsList,
  deleteSponsorsList,
}) => {
  const initialFormSponsors = {
    name: "",
    email: "",
    phoneNumber: "",
    sponsorDate: "",
    nameAnimal: "",
    sex: "",
    temperament: "",
    castrated: "",
    healthHistory: "",
    adoptionStatus: "",
    sponsorsInfo: "",
  };
  const [formSponsors, setFormSponsors] = useState(initialFormSponsors);

  useEffect(() => {
    setFormSponsors({
      ...selectedSponsor,
    });
  }, [selectedSponsor, isOpen]);

  const onClickSave = () => {
    if (selectedSponsor) {
      updateSponsorsList(formSponsors);
    } else {
      createSponsorsList(formSponsors);
    }
  };

  const onClickModalClose = () => {
    onModalClose();
    setFormSponsors(initialFormSponsors);
  };

  const onClickDelete = () => {
    if (selectedSponsor) {
      deleteSponsorsList(formSponsors);
    } 
  }

  const getFormState = (field) => {
    return formSponsors && formSponsors[field] ? formSponsors[field] : "";
  };

  return modalAction === ModalActionsEnum.DELETE ? (
    <ModalDeleteConfirm
      isOpen={isOpen}
      onModalClose={onClickModalClose}
      onDeleteConfirm={onClickDelete}
      message={`Deseja apagar o padrinho: ${selectedSponsor.name}`}
    />
  ) : (
    <Modal
      isOpen={isOpen}
      onModalClose={onClickModalClose}
      title={
        selectedSponsor
          ? "Edite os dados do padrinho"
          : "Adicione um novo padrinho"
      }
    >
      <form action="" className="modal-sponsors-form modal-form">
        <div className="al-modal-form">
          <input
            type="text"
            name="name"
            placeholder="Nome do Padrinho"
            value={getFormState("name")}
            onChange={(e) =>
              setFormSponsors({ ...formSponsors, name: e.target.value })
            }
          />
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={getFormState("email")}
            onChange={(e) =>
              setFormSponsors({ ...formSponsors, email: e.target.value })
            }
          />
        </div>
        <div className="al-modal-form">
          <IMaskInput
            type="text"
            name="phoneNumber"
            placeholder="Contato"
            value={getFormState("phoneNumber")}
            onAccept={(value, maskRef, e) =>
              setFormSponsors({ ...formSponsors, phoneNumber: value })
            }
            mask={"(00) 00000-0000"}
          />

          <input
            type="text"
            name="sponsorDate"
            id=""
            placeholder="Data do apadrinhamento"
            value={getFormState("sponsorDate")}
            onChange={(e) =>
              setFormSponsors({ ...formSponsors, sponsorDate: e.target.value })
            }
          />
        </div>

        <div className="al-modal-form">
          <input
            type="text"
            name="nameAnimal"
            id=""
            placeholder="Nome do animal"
            value={getFormState("nameAnimal")}
            onChange={(e) =>
              setFormSponsors({
                ...formSponsors,
                nameAnimal: e.target.value,
              })
            }
          />

          <input
            type="text"
            name="sex"
            id=""
            placeholder="Sexo do animal"
            value={getFormState("sex")}
            onChange={(e) =>
              setFormSponsors({
                ...formSponsors,
                sex: e.target.value,
              })
            }
          />
        </div>

        <div className="al-modal-form">
          <input
            type="text"
            name="temperament"
            id=""
            placeholder="Temperamento do animal"
            value={getFormState("temperament")}
            onChange={(e) =>
              setFormSponsors({
                ...formSponsors,
                temperament: e.target.value,
              })
            }
          />

          <input
            type="text"
            name="castrated"
            id=""
            placeholder="Castrado"
            value={getFormState("castrated")}
            onChange={(e) =>
              setFormSponsors({
                ...formSponsors,
                castrated: e.target.value,
              })
            }
          />
        </div>
        <div className="al-modal-form">
          <input
            type="text"
            name="healthHistory"
            id=""
            placeholder="Histórico de saúde"
            value={getFormState("healthHistory")}
            onChange={(e) =>
              setFormSponsors({
                ...formSponsors,
                healthHistory: e.target.value,
              })
            }
          />

          <input
            type="text"
            name="adoptionStatus"
            id=""
            placeholder="Status de adoção"
            value={getFormState("adoptionStatus")}
            onChange={(e) =>
              setFormSponsors({
                ...formSponsors,
                adoptionStatus: e.target.value,
              })
            }
          />
        </div>
        <textarea
          rows="8"
          cols="10"
          name="sponsorsInfo"
          id=""
          placeholder="Adicione informações importantes sobre o padrinho ou animal"
          value={getFormState("sponsorsInfo")}
          onChange={(e) =>
            setFormSponsors({
              ...formSponsors,
              sponsorsInfo: e.target.value,
            })
          }
        />
      </form>
      <div className="align-btn-modal">
        <button onClick={onClickSave} className="btn-modal">
          {selectedSponsor ? "Editar" : "Adicionar"}
        </button>
        <button onClick={onModalClose} className="btn-modal grey-btn">
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default ModalSponsorshipsAdmin;
