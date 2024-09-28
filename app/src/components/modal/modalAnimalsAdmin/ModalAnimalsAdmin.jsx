import { useEffect, useState, useMemo } from "react";
import Modal from "../index";
import ModalActionsEnum from '../../../utils/ModalActionsEnum'
import ModalDeleteConfirm from "../modalDeleteConfirm/ModalDeleteConfirm";
import ModalAnimalExists from "../modalAnimalExists/ModalAnimalExists";
import { checkAnimalExists } from "../../../utils/checkAnimalExists";

const ModalAnimalsAdmin = ({
  isOpen,
  modalAction,
  onModalClose,
  selectedAnimal,
  animalsList,
  updateAnimalsList,
  createAnimalsList,
  deleteAnimalsList,
}) => {
  const initialFormAnimals = useMemo(() => {
    return {
      id: 0,
      species: "",
      name: "",
      image: "",
      oldImage: "",
      gender: "",
      size: "",
      race: "",
      sector: "",
      bay: 0,
      temperament: "",
      stageLife: "",
      castrated: "",
      color: "",
      vacine: 0,
      status: "",
      observation: "",
    };
  }, []);
  const [formAnimals, setFormAnimals] = useState();

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [animalToConfirm, setAnimalToConfirm] = useState(0);

  const listSpeciesOption = [
    { id: "Cão", name: "Cão" },
    { id: "Gato", name: "Gato" },
  ];

  const listGenderOption = [
    { id: "Macho", name: "Macho" },
    { id: "Fêmea", name: "Fêmea" },
  ];

  const listSizeOption = [
    { id: "Pequeno", name: "Pequeno" },
    { id: "Médio", name: "Médio" },
    { id: "Grande", name: "Grande" },
  ];

  const listStageLifeOption = [
    { id: "Filhote", name: "Filhote" },
    { id: "Adulto", name: "Adulto" },
    { id: "Idoso", name: "Idoso" },
  ];

  const listCastrateOption = [
    { id: "Sim", name: "Sim" },
    { id: "Não", name: "Não" },
  ];

  const listStatusOption = [
    { id: "Disponível", name: "Disponível" },
    { id: "Indisponível", name: "Indisponível" },
    { id: "Clínica veterinária", name: "Clínica veterinária" },
  ];

  useEffect(() => {
    if (selectedAnimal) {
        setFormAnimals({
            ...selectedAnimal,
            oldImage: selectedAnimal?.image || null,
        });
    } else {
        setFormAnimals(initialFormAnimals);
    }
  }, [selectedAnimal, isOpen, initialFormAnimals]);


  const onClickSave = async () => {
    if (selectedAnimal) {
      return updateAnimalsList(formAnimals);
    }

    const animalExists = await checkAnimalExists(formAnimals, animalsList, setAnimalToConfirm) 
    if (animalExists)
      return setIsConfirmationModalOpen(true)

    return createAnimalsList(formAnimals);
  };

  const onClickModalClose = () => {
    onModalClose();
    setFormAnimals(initialFormAnimals);
  };

  const getFormState = (field) => {
    return formAnimals && formAnimals[field] ? formAnimals[field] : "";
  };

  const getSelectStyle = (field) => {
    return {
      color: formAnimals && formAnimals[field] && formAnimals[field] !== "" ? "black" : "grey",
    };
  };

  const onClickDelete = () => {
    if (selectedAnimal) {
      deleteAnimalsList(formAnimals);
    } 
  }

  return modalAction === ModalActionsEnum.DELETE ? (
    <ModalDeleteConfirm
      isOpen={isOpen}
      onModalClose={onClickModalClose}
      onDeleteConfirm={onClickDelete}
      message={`Deseja apagar o animal: ${selectedAnimal.name}`}
    />
  ) : (
    <Modal
      isOpen={isOpen}
      onModalClose={onClickModalClose}
      title={
        selectedAnimal ? "Edite os dados do animal" : "Adicione um novo animal"
      }
    >
      <form action="" className="modal-form">
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
            type="file" 
            id="image" 
            name="image"
            onChange={(e) => 
              setFormAnimals({ ...formAnimals, image: e.target.files[0] })
            }
          />
        </div>

        <div className="al-modal-form">
          <select
            style={getSelectStyle("gender")}
            value={getFormState("gender")}
            onChange={(e) => {
              setFormAnimals({ ...formAnimals, gender: e.target.value });
            }}
          >
            <option value="" disabled>
              Sexo
            </option>
            {listGenderOption.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            style={getSelectStyle("size")}
            value={getFormState("size")}
            onChange={(e) =>
              setFormAnimals({ ...formAnimals, size: e.target.value })
            }
          >
            <option value="" disabled>
              Porte
            </option>
            {listSizeOption.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="al-modal-form">
          <input
            type="text"
            name="race"
            id=""
            placeholder="Raça"
            value={getFormState("race")}
            onChange={(e) =>
              setFormAnimals({
                ...formAnimals,
                race: e.target.value,
              })
            }
          />

          <select
            style={getSelectStyle("stageLife")}
            value={getFormState("stageLife")}
            onChange={(e) =>
              setFormAnimals({ ...formAnimals, stageLife: e.target.value })
            }
          >
            <option value="" disabled>
              Fase da vida
            </option>
            {listStageLifeOption.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="al-modal-form">
          <input
            type="text"
            name="local"
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
            type="number"
            name="bay"
            id=""
            placeholder="Baia"
            value={getFormState("bay")}
            onChange={(e) =>
              setFormAnimals({
                ...formAnimals,
                bay: e.target.value,
              })
            }
          />
        </div>

        <div className="al-modal-form">
          <input
            type="text"
            name="temperament"
            id=""
            placeholder="Temperamento"
            value={getFormState("temperament")}
            onChange={(e) =>
              setFormAnimals({
                ...formAnimals,
                temperament: e.target.value,
              })
            }
          />

          <select
            style={getSelectStyle("castrated")}
            value={getFormState("castrated")}
            onChange={(e) =>
              setFormAnimals({ ...formAnimals, castrated: e.target.value })
            }
          >
            <option value="" disabled>
              Castrado
            </option>
            {listCastrateOption.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

        </div>

        <div className="al-modal-form">
        <input
            type="text"
            name="color"
            id=""
            placeholder="Cor"
            value={getFormState("color")}
            onChange={(e) =>
              setFormAnimals({
                ...formAnimals,
                color: e.target.value,
              })
            }
          />

          <input
            type="number"
            min="2000"
            max="9999"
            required
            name="vacine"
            id=""
            placeholder="Ano de vacinação"
            value={getFormState("vacine")}
            onChange={(e) =>
              setFormAnimals({
                ...formAnimals,
                vacine: e.target.value,
              })
            }
          />
        </div>

        <div className="al-modal-form">
          <select
            style={getSelectStyle("status")}
            value={getFormState("status")}
            onChange={(e) =>
              setFormAnimals({ ...formAnimals, status: e.target.value })
            }
          >
            <option value="" disabled>
              Status
            </option>
            {listStatusOption.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            style={getSelectStyle("species")}
            value={getFormState("species")}
            onChange={(e) => {
              setFormAnimals({ ...formAnimals, species: e.target.value });
            }}
          >
            <option value="" disabled>
              Espécie
            </option>
            {listSpeciesOption.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <textarea
          rows="8"
          cols="10"
          name="observation"
          id=""
          placeholder="Conte a história do animal"
          value={getFormState("observation")}
          onChange={(e) =>
            setFormAnimals({
              ...formAnimals,
              observation: e.target.value,
            })
          }
        />
      </form>
      <div className="align-btn-modal">
        <button onClick={onClickSave} className="btn-modal">
          {selectedAnimal ? "Editar" : "Adicionar"}
        </button>
        <button onClick={onModalClose} className="btn-modal grey-btn">
          Cancelar
        </button>
      </div>

      {isConfirmationModalOpen && (
        <ModalAnimalExists
          animalId={animalToConfirm}
          onConfirm={() => {
            setIsConfirmationModalOpen(false)
            createAnimalsList(formAnimals)
          }}
          onClose={() => setIsConfirmationModalOpen(false)}
        />
      )}
    </Modal>
  );
};

export default ModalAnimalsAdmin;
