import { useEffect, useState, useMemo } from "react";
import Modal from "../index";
import ModalActionsEnum from '../../../utils/ModalActionsEnum'
import ModalDeleteConfirm from "../modalDeleteConfirm/ModalDeleteConfirm";

const ModalAnimalsAdmin = ({
  isOpen,
  modalAction,
  onModalClose,
  selectedAnimal,
  updateAnimalsList,
  createAnimalsList,
  deleteAnimalsList,
}) => {
  const initialFormAnimals = useMemo(() => {
    return {
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
  }, []);
  const [formAnimals, setFormAnimals] = useState(initialFormAnimals);

  const listSexOption = [
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

  const listSponsorshipOption = [
    { id: "Sim", name: "Sim" },
    { id: "Não", name: "Não" },
  ];

  const listStatusOption = [
    { id: "Disponível", name: "Disponível" },
    { id: "Indisponível", name: "Indisponível" },
  ];

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

          <input type="file" id="myfile" name="myfile"/>

          {/* <input
            type="text"
            name="linkImg"
            placeholder="Link da imagem"
            value={getFormState("linkImg")}
            onChange={(e) =>
              setFormAnimals({ ...formAnimals, linkImg: e.target.value })
            }
          /> */}
        </div>
        <div className="al-modal-form">
          <select
            style={getSelectStyle("sex")}
            value={getFormState("sex")}
            onChange={(e) => {
              setFormAnimals({ ...formAnimals, sex: e.target.value });
            }}
          >
            <option value="" disabled>
              Sexo
            </option>
            {listSexOption.map((item, index) => (
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

          <input
            type="text"
            name="local"
            id=""
            placeholder="Alocação"
            value={getFormState("local")}
            onChange={(e) =>
              setFormAnimals({
                ...formAnimals,
                local: e.target.value,
              })
            }
          />
        </div>

        <div className="al-modal-form">
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
            style={getSelectStyle("sponsor")}
            value={getFormState("sponsor")}
            onChange={(e) =>
              setFormAnimals({ ...formAnimals, sponsor: e.target.value })
            }
          >
            <option value="" disabled>
              Padrinho
            </option>
            {listSponsorshipOption.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="al-modal-form">
          <input
            type="text"
            name="healthHistory"
            id=""
            placeholder="Histórico de saúde"
            value={getFormState("healthHistory")}
            onChange={(e) =>
              setFormAnimals({
                ...formAnimals,
                healthHistory: e.target.value,
              })
            }
          />
          <select
            style={getSelectStyle("status")}
            value={getFormState("status")}
            onChange={(e) =>
              setFormAnimals({ ...formAnimals, status: e.target.value })
            }
          >
            <option value="" disabled>
              Status de adoção
            </option>
            {listStatusOption.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <textarea
          rows="8"
          cols="10"
          name="animalsInfo"
          id=""
          placeholder="Conte a história do animal"
          value={getFormState("animalsInfo")}
          onChange={(e) =>
            setFormAnimals({
              ...formAnimals,
              animalsInfo: e.target.value,
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
    </Modal>
  );
};

export default ModalAnimalsAdmin;
