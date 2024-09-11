import { useEffect, useState } from 'react';
import Modal from './index'
import { IMaskInput } from "react-imask";


const ModalVolunteers = ({
  isOpen,
  onModalClose,
  selectedVolunteer,
  updateVolunteersList,
  createVolunteersList
}) => {
    const initialFormVolunteers = {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      nameResponsible: "",
      occupation: "",
      studyTime: "",
      availability: "",
      sector: "",
      startDate: "",
      volunteersInfo: "",
    };
  const [formVolunteers, setFormVolunteers] = useState(initialFormVolunteers);

  useEffect(() => {
    setFormVolunteers({
      ...selectedVolunteer
    });
  }, [selectedVolunteer, isOpen]);

  const onClickSave = () => {
    if (selectedVolunteer) {
    updateVolunteersList(formVolunteers);
    } else {
        createVolunteersList(formVolunteers);
    }
  };

  const onClickModalClose = () => {
    onModalClose()
    setFormVolunteers(initialFormVolunteers);
  }

  const getFormState = (field) => {
    return formVolunteers && formVolunteers[field] ? formVolunteers[field] : "";
  }

  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onClickModalClose}
      title={
        selectedVolunteer
          ? "Edite os dados do voluntário"
          : "Adicione um novo voluntário"
      }
    >
      <form action="" className="modal-volunteers-form modal-form">
        <div className="al-modal-form">
          <input
            type="text"
            name="name"
            placeholder="Nome do Voluntário"
            value={getFormState("name")}
            onChange={(e) =>
              setFormVolunteers({ ...formVolunteers, name: e.target.value })
            }
          />
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={getFormState("email")}
            onChange={(e) =>
              setFormVolunteers({ ...formVolunteers, email: e.target.value })
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
              setFormVolunteers({ ...formVolunteers, phoneNumber: value })
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
              setFormVolunteers({ ...formVolunteers, address: e.target.value })
            }
          />
        </div>

        <div className="al-modal-form">
          <input
            type="text"
            name="nameResponsible"
            id=""
            placeholder="Nome do responsável - se for menor"
            value={getFormState("nameResponsible")}
            onChange={(e) =>
              setFormVolunteers({
                ...formVolunteers,
                nameResponsible: e.target.value,
              })
            }
          />

          <input
            type="text"
            name="occupation"
            id=""
            placeholder="Profissão"
            value={getFormState("occupation")}
            onChange={(e) =>
              setFormVolunteers({
                ...formVolunteers,
                occupation: e.target.value,
              })
            }
          />
        </div>

        <div className="al-modal-form">
          <input
            type="text"
            name="studyTime"
            id=""
            placeholder="Horário que estuda -se menor"
            value={getFormState("studyTime")}
            onChange={(e) =>
              setFormVolunteers({
                ...formVolunteers,
                studyTime: e.target.value,
              })
            }
          />

          <input
            type="text"
            name="availability"
            id=""
            placeholder="Disponibilidade"
            value={getFormState("availability")}
            onChange={(e) =>
              setFormVolunteers({
                ...formVolunteers,
                availability: e.target.value,
              })
            }
          />
        </div>
        <div className="al-modal-form">
          <input
            type="text"
            name="sector"
            id=""
            placeholder="Setor"
            value={getFormState("sector")}
            onChange={(e) =>
              setFormVolunteers({
                ...formVolunteers,
                sector: e.target.value,
              })
            }
          />

          <input
            type="text"
            name="startDate"
            id=""
            placeholder="Data de início"
            value={getFormState("startDate")}
            onChange={(e) =>
              setFormVolunteers({
                ...formVolunteers,
                startDate: e.target.value,
              })
            }
          />
        </div>
        <textarea
          rows="8"
          cols="10"
          name="volunteersInfo"
          id=""
          placeholder="Adicione informações importantes sobre o voluntário"
          value={getFormState("volunteersInfo")}
          onChange={(e) =>
            setFormVolunteers({
              ...formVolunteers,
              volunteersInfo: e.target.value,
            })
          }
        />
      </form>
      <div className="align-btn-modal">
        <button onClick={onClickSave} className="btn-modal">
          {selectedVolunteer ? "Editar" : "Adicionar"}
        </button>
      </div>
    </Modal>
  );
};

export default ModalVolunteers