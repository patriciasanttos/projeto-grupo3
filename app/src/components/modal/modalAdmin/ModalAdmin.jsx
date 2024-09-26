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
    observation: "",
  };
  const [formAdmins, setFormAdmins] = useState(initialFormAdmins);

  const listLevelOption = [
    { id: 1, name: "Animais" },
    { id: 2, name: "Apadrinhamentos" },
    { id: 3, name: "Adoções" },
    { id: 4, name: "Voluntários" },
    { id: 5, name: "Administradores" },
    { id: 6, name: "Tudo" },
  ];

  useEffect(() => {
    const getAdminPerms = (admin) => {
      const adminPerms = admin.permissions.map(perm => perm.id);
      return adminPerms;
    }

    setFormAdmins({
      ...selectedAdmin,
      permissions: isOpen && selectedAdmin ? getAdminPerms(selectedAdmin) : []
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
            value={getFormState("phone")}
            onAccept={(value, maskRef, e) =>
              setFormAdmins({ ...formAdmins, phone: value })
            }
            mask={"(00) 00000-0000"}
          />

          <input
            type="text"
            name="password"
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
              <div className="checkbox" key={index}>
                <input
                  type="checkbox"
                  name={item.id}
                  onChange={(e) => onChangeCheckbox(e.target.checked, item.id)}
                  checked={formAdmins?.permissions.indexOf(item.id) !== -1 ? "checked" : ""}
                />
                <label for={item.id}>{item.name}</label>
              </div>
            ))}
          </div>
        </div>

        <textarea
          rows="8"
          cols="10"
          name="observation"
          placeholder="Adicione informações importantes"
          value={getFormState("observation")}
          onChange={(e) =>
            setFormAdmins({
              ...formAdmins,
              observation: e.target.value,
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
