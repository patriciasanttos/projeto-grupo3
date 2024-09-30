import { toast } from 'react-toastify';

import Accept from "../../assets/icons/accept-icon.svg";
import Deny from "../../assets/icons/deny-icon.svg";
import Tooltip from "../tooltip";

import "./ActionsForm.scss";

const ActionsForm = ({ selectedItem, accept, deny, refresh }) => {
  const acceptForm = async () => {
    await accept(
      selectedItem.id,
      localStorage.getItem("login")
    )
      .then(() => {
        toast.success("Aprovado com sucesso!");
        refresh();
      })
      .catch((error) =>{ 
        console.log(error)
        toast.error("Erro ao aceitar. Tente novamente.");
      });
  };

  const denyForm = async () => {
    await deny(selectedItem.id, localStorage.getItem("login"))
      .then(() => {
        toast.success("Rejeitado com sucesso!");
        refresh();
      })
      .catch((error) =>{ 
        console.log(error)
        toast.error("Erro ao rejeitar. Tente novamente.");
      });
  };

  return (
    <td className="actions-form-container">
      <div>
        <Tooltip text="Aprovar">
          <button className="btn-actions-form" onClick={acceptForm}>
            <img src={Accept} alt="" />
          </button>
        </Tooltip>
      </div>
      <div>
        <Tooltip text="Rejeitar">
          <button className="btn-actions-form" onClick={denyForm}>
            <img src={Deny} alt="" />
          </button>
        </Tooltip>
      </div>
    </td>
  );
};

export default ActionsForm;
