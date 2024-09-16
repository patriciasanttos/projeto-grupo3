import { useEffect, useState, useCallback } from "react";
import Modal from "../index";
import { IMaskInput } from "react-imask";
import ModalActionsEnum from "../../../utils/ModalActionsEnum";
import ModalDeleteConfirm from "../modalDeleteConfirm/ModalDeleteConfirm";

const ModalAdmin = ({
  isOpen,
  modalAction,
  onModalClose,
  selectedAdmin,
  updateAdminsList,
  createAdminsList,
  deleteAdminsList,
}) => {
  const initialFormAdmins = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    permissions: [],
    adminsInfo: "",
  };
  const [formAdmins, setFormAdmins] = useState(initialFormAdmins);

  const listLevelOption = [
    { id: "Nível 1", name: "Nível 1" },
    { id: "Nível 2", name: "Nível 2" },
    { id: "Nível 3", name: "Nível 3" },
    { id: "Nível 4", name: "Nível 4" },
    { id: "Nível 5", name: "Nível 5" },
    { id: "Nível 6", name: "Nível 6" },
  ];

  useEffect(() => {
    setFormAdmins({
      ...selectedAdmin,
    });
  }, [selectedAdmin, isOpen]);

  const onClickSave = () => {
    if (selectedAdmin) {
      updateAdminsList(formAdmins);
    } else {
      createAdminsList(formAdmins);
    }
  };

  const onClickModalClose = () => {
    onModalClose();
    setFormAdmins(initialFormAdmins);
  };

  const onClickDelete = () => {
    if (selectedAdmin) {
      deleteAdminsList(formAdmins);
    }
  };

  const getFormState = (field) => {
    return formAdmins && formAdmins[field] ? formAdmins[field] : "";
  };

  const onChangeCheckbox = useCallback((isChecked, id) => {
    let currentPermissions = [...formAdmins.permissions];

    if (isChecked) {
      currentPermissions.push(id);
    } else {
      currentPermissions = currentPermissions.filter(
        (permission) => permission !== id
      );
    }

    setFormAdmins({ ...formAdmins, permissions: currentPermissions });
  }, [formAdmins]);

  return modalAction === ModalActionsEnum.DELETE ? (
    <ModalDeleteConfirm
      isOpen={isOpen}
      onModalClose={onClickModalClose}
      onDeleteConfirm={onClickDelete}
      message={`Deseja apagar o integrante: ${selectedAdmin.name}`}
    />
  ) : (
    <Modal
      isOpen={isOpen}
      onModalClose={onClickModalClose}
      title={
        selectedAdmin
          ? "Edite os dados do integrante"
          : "Adicione um novo integrante"
      }
    >
      <form action="" className="modal-admins-form modal-form">
        <div className="al-modal-form">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={getFormState("name")}
            onChange={(e) =>
              setFormAdmins({ ...formAdmins, name: e.target.value })
            }
          />
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={getFormState("email")}
            onChange={(e) =>
              setFormAdmins({ ...formAdmins, email: e.target.value })
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
              setFormAdmins({ ...formAdmins, phoneNumber: value })
            }
            mask={"(00) 00000-0000"}
          />

          <input
            type="text"
            name="password"
            id=""
            placeholder="Senha"
            value={getFormState("password")}
            onChange={(e) =>
              setFormAdmins({ ...formAdmins, password: e.target.value })
            }
          />
        </div>

        <div>
          <p>Selecionar níveis:</p>
          <div className="list-checkbox-container">
            {listLevelOption.map((item, index) => (
              <div className="checkbox">
                <input
                  type="checkbox"
                  name={item.id}
                  onChange={(e) => onChangeCheckbox(e.target.checked, item.id)}
                  checked={formAdmins?.permissions?.indexOf(item.id) !== -1 ? "checked" : ""}
                />
                <label for={item.id}>{item.name}</label>
              </div>
            ))}
          </div>
        </div>

        <textarea
          rows="8"
          cols="10"
          name="adminsInfo"
          id=""
          placeholder="Adicione informações importantes"
          value={getFormState("adminsInfo")}
          onChange={(e) =>
            setFormAdmins({
              ...formAdmins,
              adminsInfo: e.target.value,
            })
          }
        />
      </form>
      <div className="align-btn-modal">
        <button onClick={onClickSave} className="btn-modal">
          {selectedAdmin ? "Editar" : "Adicionar"}
        </button>
        <button onClick={onModalClose} className="btn-modal grey-btn">
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default ModalAdmin;
