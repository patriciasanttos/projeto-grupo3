import Accept from "../../assets/icons/accept-icon.svg";
import Deny from "../../assets/icons/deny-icon.svg";

import './ActionsForm.scss'

const ActionsForm = () => {
    const acceptForm = () => {
        alert('aceitou')
    }

    const denyForm = () => {
      alert("rejeitou");
    };


  return (
    <section className="actions-form-container">
      <div>
        <button className="btn-actions-form" onClick={acceptForm}>
          <img src={Accept} alt="" />
        </button>
      </div>
      <div>
        <button className="btn-actions-form" onClick={denyForm}>
          <img src={Deny} alt="" />
        </button>
      </div>
    </section>
  );
};

export default ActionsForm
