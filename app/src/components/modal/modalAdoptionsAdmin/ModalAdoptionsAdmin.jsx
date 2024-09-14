import { useEffect, useState } from "react";
import Modal from "../index";
import { IMaskInput } from "react-imask";
import ModalActionsEnum from '../../../utils/ModalActionsEnum'
import ModalDeleteConfirm from "../modalDeleteConfirm/ModalDeleteConfirm";

const ModalAdoptionsAdmin = ({
  isOpen,
  modalAction,
  onModalClose,
  selectedTutor,
  updateTutorsList,
  createTutorsList,
  deleteTutorsList,
}) => {
  const initialFormTutors = {
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    nameAnimal: "",
    sex: "",
    temperament: "",
    castrated: "",
    healthHistory: "",
    adoptionDate: "",
    tutorsInfo: "",
  };
  const [formTutors, setFormTutors] = useState(initialFormTutors);

  useEffect(() => {
    setFormTutors({
      ...selectedTutor,
    });
  }, [selectedTutor, isOpen]);

  const onClickSave = () => {
    if (selectedTutor) {
      updateTutorsList(formTutors);
    } else {
      createTutorsList(formTutors);
    }
  };

  const onClickModalClose = () => {
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
      message={`Deseja apagar o tutor: ${selectedTutor.name}`}
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
            value={getFormState("name")}
            onChange={(e) =>
              setFormTutors({ ...formTutors, name: e.target.value })
            }
          />
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={getFormState("email")}
            onChange={(e) =>
              setFormTutors({ ...formTutors, email: e.target.value })
            }
          />
        </div>
        <div className="al-modal-form">
          <IMaskInput
            type="text"
            name="Celular"
            placeholder="Contato"
            value={getFormState("phoneNumber")}
            onAccept={(value, maskRef, e) =>
              setFormTutors({ ...formTutors, phoneNumber: value })
            }
            mask={"(00) 00000-0000"}
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
              setFormTutors({
                ...formTutors,
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
              setFormTutors({
                ...formTutors,
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
              setFormTutors({
                ...formTutors,
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
              setFormTutors({
                ...formTutors,
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
              setFormTutors({
                ...formTutors,
                healthHistory: e.target.value,
              })
            }
          />

          <input
            type="text"
            name="adoptionDate"
            id=""
            placeholder="Data da adoção"
            value={getFormState("adoptionDate")}
            onChange={(e) =>
              setFormTutors({
                ...formTutors,
                adoptionDate: e.target.value,
              })
            }
          />
        </div>
        <textarea
          rows="8"
          cols="10"
          name="tutorsInfo"
          id=""
          placeholder="Adicione informações importantes sobre o tutor ou animal"
          value={getFormState("tutorsInfo")}
          onChange={(e) =>
            setFormTutors({
              ...formTutors,
              tutorsInfo: e.target.value,
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
