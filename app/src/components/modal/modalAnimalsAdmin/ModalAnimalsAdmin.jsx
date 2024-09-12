import { useEffect, useState } from 'react';
import Modal from '../index'
import { IMaskInput } from "react-imask";


const ModalAnimalsAdmin = ({
  isOpen,
  onModalClose,
  selectedAnimal,
  updateAnimalsList,
  createAnimalsList
}) => {
    const initialFormAnimals = {
      name: "",
      linkImg: "",
      sex: "",
      size: "",
      race: "",
      local: "",
      temperament: "",
      sponsor: "",
      status: "",
      stageLife: "",
      healthHistory: "",
      castrated: "",
      animalsInfo: "",
    };
  const [formAnimals, setFormAnimals] = useState(initialFormAnimals);

  useEffect(() => {
    setFormAnimals({
      ...selectedAnimal,
    });
  }, [selectedAnimal, isOpen]);

  const onClickSave = () => {
    if (selectedAnimal) {
    updateAnimalsList(formAnimals);
    } else {
        createAnimalsList(formAnimals);
    }
  };

  const onClickModalClose = () => {
    onModalClose()
    setFormAnimals(initialFormAnimals);
  }

  const getFormState = (field) => {
    return formAnimals && formAnimals[field] ? formAnimals[field] : "";
  }

  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onClickModalClose}
      title={
        selectedAnimal
          ? "Edite os dados do animal"
          : "Adicione um novo animal"
      }
    >
      <form action="" className="modal-animals-form modal-form">
        <div className="al-modal-form">
          <input
            type="text"
            name="name"
            placeholder="Nome do animal"
            value={getFormState("name")}
            onChange={(e) =>
              setFormAnimals({ ...formAnimals, name: e.target.value })
            }
          />
          <input
            type="text"
            name="linkImg"
            placeholder="Link da imagem"
            value={getFormState("linkImg")}
            onChange={(e) =>
              setFormAnimals({ ...formAnimals, linkIgm: e.target.value })
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
              setFormAnimals({ ...formAnimals, phoneNumber: value })
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
              setFormAnimals({ ...formAnimals, address: e.target.value })
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
              setFormAnimals({
                ...formAnimals,
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
              setFormAnimals({
                ...formAnimals,
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
              setFormAnimals({
                ...formAnimals,
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
              setFormAnimals({
                ...formAnimals,
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
              setFormAnimals({
                ...formAnimals,
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
              setFormAnimals({
                ...formAnimals,
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
            setFormAnimals({
              ...formAnimals,
              volunteersInfo: e.target.value,
            })
          }
        />
      </form>
      <div className="align-btn-modal">
        <button onClick={onClickSave} className="btn-modal">
          {selectedAnimal ? "Editar" : "Adicionar"}
        </button>
      </div>
    </Modal>
  );
};

export default ModalAnimalsAdmin;