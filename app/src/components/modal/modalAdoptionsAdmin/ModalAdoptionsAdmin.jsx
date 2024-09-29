import { useEffect, useState } from "react";
import Modal from "../index";
import { IMaskInput } from "react-imask";
import ModalActionsEnum from '../../../utils/ModalActionsEnum'
import ModalDeleteConfirm from "../modalDeleteConfirm/ModalDeleteConfirm";
import Dropdown from "../../dropdown";

const ModalAdoptionsAdmin = ({
  isOpen,
  modalAction,
  onModalClose,
  selectedTutor,
  updateTutorsList,
  createTutorsList,
  deleteTutorsList,
  animalsList
}) => {
  const initialFormTutors = {
    tutors_name: "",
    email: "",
    phone: "",
    address: "",
    cpf: "",
    animal_id: "",
    observation: "",
  };
  const [formTutors, setFormTutors] = useState(initialFormTutors);

  const [ emptyInput, setEmptyInput ] = useState({
    tutors_name: false,
    email: false,
    phone: false,
    address: false,
    cpf: false,
    animal_id: false,
    observation: false,
  });

  useEffect(() => {
    setFormTutors({
      ...selectedTutor,
    });
  }, [selectedTutor, isOpen]);

  const onClickSave = () => {
    setEmptyInput({
      tutors_name: false,
      email: false,
      phone: false,
      address: false,
      cpf: false,
      animal_id: false,
    });

    let hasError = false;

    if (!formTutors.tutors_name) {
      setEmptyInput(prev => ({ ...prev, tutors_name: true }));
      hasError = true;
    }
    if (!formTutors.email) {
      setEmptyInput(prev => ({ ...prev, email: true }));
      hasError = true;
    }
    if (!formTutors.phone) {
      setEmptyInput(prev => ({ ...prev, phone: true }));
      hasError = true;
    }
    if (!formTutors.address) {
      setEmptyInput(prev => ({ ...prev, address: true }));
      hasError = true;
    }
    if (!formTutors.cpf) {
      setEmptyInput(prev => ({ ...prev, cpf: true }));
      hasError = true;
    }
    if (!formTutors.animal_id) {
      setEmptyInput(prev => ({ ...prev, animal_id: true }));
      hasError = true;
    }

    console.log(formTutors.animal_id)

    if (hasError) 
      return;

    if (selectedTutor) {
      updateTutorsList(formTutors);
    } else {
      createTutorsList(formTutors);
    }
  };

  const onClickModalClose = () => {
    setEmptyInput({
      tutors_name: false,
      email: false,
      phone: false,
      address: false,
      cpf: false,
      animal_id: false,
    });

    onModalClose();
    setFormTutors(initialFormTutors);
  };

  const onClickDelete = () => {
    if (selectedTutor) {
      deleteTutorsList(formTutors);
    } 
  }

  const getFormState = (field) => {
    return formTutors && formTutors[field] ? formTutors[field] : "";
  };

  return modalAction === ModalActionsEnum.DELETE ? (
    <ModalDeleteConfirm
      isOpen={isOpen}
      onModalClose={onClickModalClose}
      onDeleteConfirm={onClickDelete}
      message={`Deseja apagar o tutor: ${selectedTutor.tutors_name}`}
    />
  ) : (
    <Modal
      isOpen={isOpen}
      onModalClose={onClickModalClose}
      title={
        selectedTutor ? "Edite os dados do tutor" : "Adicione um novo tutor"
      }
    >
      <form action="" className="modal-tutors-form modal-form">
        <div className="al-modal-form">
          <input
            type="text"
            name="name"
            placeholder="Nome do Tutor"
            value={getFormState("tutors_name")}
            onChange={(e) =>
              setFormTutors({ ...formTutors, tutors_name: e.target.value })
            }
            className={emptyInput.tutors_name ? 'input-required' : ''}
          />
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={getFormState("email")}
            onChange={(e) =>
              setFormTutors({ ...formTutors, email: e.target.value })
            }
            className={emptyInput.email ? 'input-required' : ''}
          />
        </div>
        <div className="al-modal-form">
          <IMaskInput
            type="text"
            name="Celular"
            placeholder="Contato"
            value={getFormState("phone")}
            onAccept={(value, maskRef, e) =>
              setFormTutors({ ...formTutors, phone: value })
            }
            mask={"(00) 00000-0000"}
            className={emptyInput.phone ? 'input-required' : ''}
          />

          <input
            type="text"
            name="address"
            id=""
            placeholder="Endereço completo"
            value={getFormState("address")}
            onChange={(e) =>
              setFormTutors({ ...formTutors, address: e.target.value })
            }
            className={emptyInput.address ? 'input-required' : ''}
          />
        </div>

        <div className="al-modal-form">
          <IMaskInput
            mask={"000.000.000-00"}
            value={formTutors.cpf}
            onAccept={(value) =>
              setFormTutors({ ...formTutors, cpf: value })
            }
            placeholder="CPF"
            className={emptyInput.cpf ? 'input-required' : ''}
          />

          <Dropdown
            defaultValue=""
            placeholder="Animal"
            name="animal_id"
            readOnly={selectedTutor ? true : false}
            value={getFormState("animal_id")}
            onChange={(e) => setFormTutors({
              ...formTutors,
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
          placeholder="Adicione informações importantes sobre o tutor ou animal"
          value={getFormState("observation")}
          onChange={(e) =>
            setFormTutors({
              ...formTutors,
              observation: e.target.value,
            })
          }
        />
      </form>
      <div className="align-btn-modal">
        <button onClick={onClickSave} className="btn-modal">
          {selectedTutor ? "Editar" : "Adicionar"}
        </button>
        <button onClick={onModalClose} className="btn-modal grey-btn">
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default ModalAdoptionsAdmin;
