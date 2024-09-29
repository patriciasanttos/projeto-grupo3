import { useEffect, useState } from "react";
import Modal from "../index";
import { IMaskInput } from "react-imask";
import ModalActionsEnum from '../../../utils/ModalActionsEnum'
import ModalDeleteConfirm from "../modalDeleteConfirm/ModalDeleteConfirm";
import Dropdown from "../../../components/dropdown";

const ModalSponsorshipsAdmin = ({
  isOpen,
  modalAction,
  onModalClose,
  selectedSponsor,
  updateSponsorsList,
  createSponsorsList,
  deleteSponsorsList,
  animalsList
}) => {
  const initialFormSponsors = {
    name: "",
    email: "",
    phone: "",
    animal_id: 0,
    observation: "",
  };
  const [formSponsors, setFormSponsors] = useState(initialFormSponsors);

  const [ emptyInput, setEmptyInput ] = useState({
    name: false,
    email: false,
    phone: false,
    animal_id: false,
    observation: false,
  });

  useEffect(() => {
    setFormSponsors({
      ...selectedSponsor,
    });
  }, [selectedSponsor, isOpen]);

  const onClickSave = () => {
    setEmptyInput({
      name: false,
      email: false,
      phone: false,
      animal_id: false,
    });

    let hasError = false;

    if (!formSponsors.name) {
      setEmptyInput(prev => ({ ...prev, name: true }));
      hasError = true;
    }
    if (!formSponsors.email) {
      setEmptyInput(prev => ({ ...prev, email: true }));
      hasError = true;
    }
    if (!formSponsors.phone) {
      setEmptyInput(prev => ({ ...prev, phone: true }));
      hasError = true;
    }
    if (!formSponsors.animal_id) {
      setEmptyInput(prev => ({ ...prev, animal_id: true }));
      hasError = true;
    }

    if (hasError) 
      return;

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
            className={emptyInput.name ? 'input-required' : ''}
          />
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={getFormState("email")}
            onChange={(e) =>
              setFormSponsors({ ...formSponsors, email: e.target.value })
            }
            className={emptyInput.email ? 'input-required' : ''}
          />
        </div>
        <div className="al-modal-form">
          <IMaskInput
            type="text"
            name="phone"
            placeholder="Contato"
            value={getFormState("phone")}
            onAccept={(value, maskRef, e) =>
              setFormSponsors({ ...formSponsors, phone: value })
            }
            mask={"(00) 00000-0000"}
            className={emptyInput.phone ? 'input-required' : ''}
          />

          <Dropdown
            defaultValue=""
            placeholder="Animal"
            name="animal_id"
            readOnly={selectedSponsor ? true : false}
            value={getFormState("animal_id")}
            onChange={(e) => setFormSponsors({
              ...formSponsors,
              animal_id: e.target.value,
            })}
            className={emptyInput.animal_id ? 'input-required' : ''}
          >
            {
              animalsList.map((animal) => (
                <option key={animal.id} value={animal.id}>{animal.id}: {animal.name}</option>
              ))
            }
          </Dropdown>
        </div>

        <textarea
          rows="8"
          cols="10"
          name="observation"
          id=""
          placeholder="Adicione informações importantes sobre o padrinho ou animal"
          value={getFormState("observation")}
          onChange={(e) =>
            setFormSponsors({
              ...formSponsors,
              observation: e.target.value,
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
